import Link from "next/link";
import { BsGoogle, BsArrowLeftShort } from "react-icons/bs";

export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center flex-col bg-neutral-200 dark:bg-zinc-800">
      <div className="relative rounded-3xl overflow-hidden w-[80rem] bg-white dark:bg-zinc-500 h-[37rem] shadow-lg shadow-gray-400">
        <div className="absolute top-0 h-full left-0 w-6/12 transition-all duration-[0.6s] ease-[ease-in-out]">
          <div className="absolute top-8">
            <Link
              href="#"
              className="text-base flex items-center justify-center ml-8 gap-3 font-bold transition-all duration-[0.5s] ease-[ease] hover:text-indigo-800">
              <BsArrowLeftShort className="text-2xl" /> Página Inicial
            </Link>
          </div>
          <form className="h-full flex items-center justify-center flex-col py-0 px-10 bg-white dark:bg-zinc-500">
            <h1 className="text-4xl pb-2 font-semibold">Entre com</h1>
            <div className="pb-5 my-5 mx-0">
              <a
                href="#"
                className="inline-flex justify-center items-center rounded-2xl my-0 mx-3 border border-gray-200 p-4">
                <BsGoogle />
              </a>
              <a
                href="#"
                className="inline-flex justify-center items-center rounded-2xl my-0 mx-3 border border-gray-200 p-4">
                <BsGoogle />
              </a>
              <a
                href="#"
                className="inline-flex justify-center items-center rounded-2xl my-0 mx-3 border border-gray-200 p-4">
                <BsGoogle />
              </a>
            </div>
            <span className="text-xs text-gray-500">A opção de logar por e-mail está em manutenção no momento.</span>
            <input
              type="text"
              placeholder="E-mail ou Usuário"
              disabled
              className="text-xs rounded-lg w-4/5 file:border-none outline-none py-4 px-4 my-3 mx-0 bg-gray-200"
            />
            <input
              type="password"
              placeholder="Senha"
              disabled
              className="text-xs rounded-lg w-4/5 file:border-none outline-none py-4 px-4 my-3 mx-0 bg-gray-200"
            />
            <a href="#" className="text-xs no-underline text-gray-400 hover:text-blue-700 mx-0 my-4">
              Esqueci minha senha.
            </a>
            <button className="text-base rounded-lg font-semibold uppercase mt-4 cursor-pointer border-spacing-px bg-indigo-500 hover:bg-indigo-800 border-opacity-0 transition-all duration-[0.5s] ease-[ease] tracking-wide py-3 px-11 text-white">
              Entrar
            </button>
          </form>
        </div>
        <div className="absolute top-0 w-6/12 h-full overflow-hidden left-2/4 transition-all duration-[0.6s] ease-[ease-in-out]">
          <div className="h-full flex justify-center items-center flex-col bg-indigo-500 bg-gradient-to-br from-indigo-500 to-indigo-900">
            <h1 className="text-4xl font-semibold text-white">Seja Bem-vindo de volta!</h1>
            <p className="text-base leading-5 mx-0 my-5 text-white">Fique por dentro dos pedidos de seus serviços</p>
            <img src="/Logo 3.0 (branco).png" className="absolute h-2/3 opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
