import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quadra Livre Crateus | Bem-vindo" },
    { name: "description", content: "Seja bem-vindo ao Quadra Livre Crateus!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
