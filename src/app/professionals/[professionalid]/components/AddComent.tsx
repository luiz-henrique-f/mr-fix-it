'use client'

import Button from "@/components/Button";
import { Prestador } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { FaPlus } from "react-icons/fa";

interface AddComentProps {
  professionalId: string
}

const AddComent = ({ professionalId }: AddComentProps) => {
  const { status } = useSession()
  return (
    <>
      {status === 'unauthenticated' && (
        <Link href={`/professionalComment/${professionalId}`}>
          <Button variant="outlined">
            <FaPlus />
            Adicionar comentário
          </Button>
        </Link>
      )}
    </>
  );
}

export default AddComent;