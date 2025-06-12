import Link from 'next/link'
export default function Home() {
  return (
    <>
    <p>Cadastre-se agora!</p>
    <Link href="/cadastro">Cadastre-se!</Link><br />
    <Link href="/login">fazer Login</Link><br></br>


    </>
  );
};