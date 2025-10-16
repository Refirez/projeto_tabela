import Image from "next/image";
import Card from "../../../components/card/Card";

export default function About() {
  const desenvolvedores = [
    { title: "Bernardo Neves", imageUrl: "/eu.jpeg" },
    { title: "Vinicius Fontenele", imageUrl: "/font.jpeg" },
    { title: "Antônio Carlos", imageUrl: "/Carlos.jpg" },
    { title: "Arthur Bechara", imageUrl: "/art.png" },
    { title: "Gustavo Batista", imageUrl: "/bat.png" },
  ];

  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 2rem",
        background: "linear-gradient(180deg, #f9fafb, #eef2ff)",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#4f46e5",
          marginBottom: "2rem",
        }}
      >
        Desenvolvedores
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "2.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {desenvolvedores.map((dev, index) => (
          <Card key={index} title={dev.title} imageUrl={dev.imageUrl} />
        ))}
      </div>
    </div>
  );
}
