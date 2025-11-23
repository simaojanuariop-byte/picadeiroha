import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID da reserva é obrigatório' },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.delete({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Reserva deletada com sucesso',
      reservation: {
        id: reservation.id,
        clientName: reservation.user?.name || 'Sem nome',
      },
    });
  } catch (error: any) {
    console.error('Erro ao deletar reserva:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Reserva não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao deletar reserva' },
      { status: 500 }
    );
  }
}
