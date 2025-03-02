import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { Vacansies } from "@/components/shared/about/vacansies";

export default async function About() {
  return (
    <Container className="mt-4 md:mt-10">
      <Title text="Главная" size="lg" className="font-extrabold" />
      <Vacansies className="mt-6" />
    </Container>
  );
}
