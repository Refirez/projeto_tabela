import Image from "next/image";
import { title } from "process";
import Card from "../../../components/card/Card";

export default function About() {
  const desenvolvedores = [
    {
      title: "Bernardo Cidrão Neves",
      imageUrl: "/eu.jpg"
    },
    {
      title: "Vinicius Fontenele Costa Lima",
      imageUrl: "/12345567.png"
    },
    {
      title: "Antônio Carlos",
      imageUrl: "/Carlos.jpg"
    },
    {
      title:"Arthur Bechara",
      imageUrl:"/art.png"
    },
    {
      title:"Gustavo Batista",
      imageUrl:"/bat.png"
    },
  ];

  return (
    <div style={{textAlign: 'center', marginTop:'2rem'}}>
      <h1>Desenvolvedores</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
        marginTop: '2rem',

      }}>
      {desenvolvedores.map((dev, index) => (
        <Card
          key={index}
          title={dev.title}
          imageUrl={dev.imageUrl}
        />
      ))}
    </div>
  </div>
  );
}
