
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  
  const { url, id_prestador } = req;

  await prisma.foto_Prestador.create({
    data: {
      id_prestador: id_prestador,
      url_foto: url,
    },
  });

  return new NextResponse(
      JSON.stringify({
          success: true,
      })
  )
}