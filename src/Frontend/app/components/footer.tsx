// src/components/Button.tsx
type FooterProperties = {
    text?: string;
    className?: string;
};

export function Footer({
    text,
    className,
}: FooterProperties) {
    return (
        <footer className={className}>
            {text ?? `© ${new Date().getFullYear()} Quadra Livre Crateús. Todos os direitos reservados. Reprodução ou uso não autorizado é proibido.`}
        </footer>
    );
}
