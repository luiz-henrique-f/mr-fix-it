import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import { CgProfile } from 'react-icons/cg'
import { AiOutlineMenu, AiFillStar } from 'react-icons/ai'
import { ImCancelCircle } from "react-icons/im";
import { BsCheck2Square, BsGraphUp } from "react-icons/bs";

import Button from "./Button";

type IdPrestadorResponse = {
  id: string;
};

type PlanoAtivoResponse = {
  plano: string;
};

const HamburguerMenu = () => {

  const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };

    const handleClickOpen = () => {
      setOpen(true);
  };

  const router = useRouter()

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const hidennMenu = () => {
    setMenuIsOpen(false)
  };

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  const [id_prestador, setIdPrestador] = React.useState<IdPrestadorResponse[]>([]);
  const [planoAtivo, setPlanoAtivo] = React.useState<PlanoAtivoResponse[]>([]);

  const handleLoginClick = () => signIn();
  const handleLogoutClick = () => {
    setMenuIsOpen(false)
    signOut()
  };
  
  return (
    <>
      {menuIsOpen && (
        <div className="z-50 absolute top-[56px] -left-[88px] 2xl:left-4 bg-white rounded-lg shadow-md gap-4 dark:bg-darkBGLighter after:border-l-[10px] after:border-r-[10px] after:border-t-[10px] after:border-transparent after:border-t-white dark:after:border-t-darkBGLighter after:absolute after:rotate-180 after:-top-2 after:left-28 2xl:after:left-2">

          <ul className="flex flex-col items-end 2xl:items-start justify-end p-2">
            {id_prestador != undefined && planoAtivo != undefined && (
              <div>
                <li className="group">
                  <Link href={`/dashboard/${id_prestador}`}>
                    <Button
                      onClick={hidennMenu}
                      variant="dropbar">

                      <BsGraphUp className="text-xl text-center text-primary dark:text-primaryLighter" />
                      <span className="text-lg">Dashboard</span>
                    </Button>
                  </Link>
                </li>

                <li className="group">
                  <Link href={`/professionals/${id_prestador}`}>
                    <Button
                      onClick={hidennMenu}
                      variant="dropbar">

                      <CgProfile className="text-xl text-center text-primary dark:text-primaryLighter" />
                      <span className="text-lg">Meu Perfil</span>
                    </Button>
                  </Link>
                </li>

                <li className="group">
                  <Link onClick={handleClickOpen} href={""}>
                    <Button
                      onClick={hidennMenu}
                      variant="dropbar">

                      <AiFillStar className="text-xl text-center text-primary dark:text-primaryLighter" />
                      <span className="text-lg">Avaliar</span>
                    </Button>
                  </Link>
                </li>
              </div>
            )}

            <li className="group w-full">
              <Button
                variant="dropbar"
                onClick={() => {
                  signOut({ redirect: false }).then(() => {
                    router.push("/"); // Redirect to the dashboard page after signing out
                  });
                }}
                className="">

                <ImCancelCircle className="text-xl text-center text-primary dark:text-primaryLighter" />
                <span className="text-lg">Logout</span>
              </Button>
            </li>
          </ul>

        </div>
      )}
    </>
  )
}

export default HamburguerMenu