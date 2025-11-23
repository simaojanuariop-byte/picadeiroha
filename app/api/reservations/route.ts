import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    // Buscar todas as reservas do banco de dados
    const reservations = await prisma.reservation.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Transformar dados para o formato esperado pelo frontend
    const formattedReservations = reservations.map(res => ({
      id: res.id,
      clientName: res.user?.name || 'Sem nome',
      professor: 'Professor', // Pode ser melhorado com mais dados no schema
      horses: res.horse ? [res.horse] : [],
      lessonType: res.type === 'individual' ? 'individual' : 'group' as 'individual' | 'group',
      date: res.date.toISOString().split('T')[0],
      startTime: res.time,
      duration: (res.type === 'individual' ? 30 : 60) as 30 | 60,
      status: res.status === 'confirmed' ? 'confirmed' : res.status === 'pending' ? 'pending' : 'cancelled' as 'confirmed' | 'pending' | 'cancelled',
    }));

    return NextResponse.json(formattedReservations);
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    // Retornar array vazio em caso de erro
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, date, time, type, horse, level, notes, status } = body;

    // Validações básicas
    if (!userId || !date || !time || !type) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes: userId, date, time, type' },
        { status: 400 }
      );
    }

    // Validar que o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Validar limite de reservas por hora (máximo 4)
    const sameDateTimeReservations = await prisma.reservation.count({
      where: {
        date: new Date(date),
        time: time,
        status: { not: 'cancelled' },
      },
    });

    if (sameDateTimeReservations >= 4) {
      return NextResponse.json(
        { error: 'Limite de 4 reservas para este horário já atingido' },
        { status: 409 }
      );
    }

    // Validar limite de cavalos por professor (máximo 4)
    if (horse) {
      const sameHorseReservations = await prisma.reservation.count({
        where: {
          horse: horse,
          date: new Date(date),
          status: { not: 'cancelled' },
        },
      });

      if (sameHorseReservations >= 4) {
        return NextResponse.json(
          { error: 'Limite de 4 utilizações para este cavalo já atingido' },
          { status: 409 }
        );
      }
    }

    // Criar reserva no banco de dados
    const reservation = await prisma.reservation.create({
      data: {
        userId,
        date: new Date(date),
        time,
        type,
        horse: horse || null,
        level: level || null,
        notes: notes || null,
        status: status || 'pending',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Retornar reserva criada no formato esperado
    const formattedReservation = {
      id: reservation.id,
      clientName: reservation.user?.name || 'Sem nome',
      professor: 'Professor',
      horses: reservation.horse ? [reservation.horse] : [],
      lessonType: reservation.type === 'individual' ? 'individual' : 'group' as 'individual' | 'group',
      date: reservation.date.toISOString().split('T')[0],
      startTime: reservation.time,
      duration: (reservation.type === 'individual' ? 30 : 60) as 30 | 60,
      status: reservation.status === 'confirmed' ? 'confirmed' : reservation.status === 'pending' ? 'pending' : 'cancelled' as 'confirmed' | 'pending' | 'cancelled',
    };

    return NextResponse.json(formattedReservation, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    return NextResponse.json(
      { error: 'Erro ao criar reserva. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}

