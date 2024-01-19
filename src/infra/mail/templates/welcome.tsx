import { Font, Head, Html, Preview, Text } from '@react-email/components';
import * as React from 'react';
import { ButtonCenter } from './components';
import MainLayout from './layouts/main';

interface Props {
	link: string;
}

export default function WelcomeEmail({ link = 'http://localhost:5001' }: Props) {
	return (
		<Html lang="pt-BR">
			<Head>
				<Font
					fontFamily="Nunito sans"
					fallbackFontFamily="sans-serif"
					webFont={{
						url: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,400&display=swap',
						format: 'woff2',
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
			</Head>
			<Preview>Bem-vindo ao Branium</Preview>

			<MainLayout title="Bem-vindo ao Branium">
				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white tracking-wide mb-[16px]">
					Caro anônimo,
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white tracking-wide mb-[16px]">
					Seja muito bem-vindo ao Branium, o seu novo espaço para comunicação eficiente e
					descomplicada! Estamos animados em tê-lo conosco e esperamos que aproveite ao
					máximo todas as funcionalidades que o Branium tem a oferecer.
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white tracking-wide mb-[40px]">
					No Branium, nossa missão é facilitar a comunicação, conectando você de maneira
					simples e intuitiva. Quer esteja compartilhando ideias com colegas de trabalho,
					mantendo contato com amigos e familiares ou organizando eventos, o Branium está
					aqui para tornar essas interações mais fluidas e agradáveis.
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-center text-white my-[24px] tracking-wide mb-[24px]">
					Finalize o seu cadastro clicando no link abaixo:
				</Text>

				<ButtonCenter link={link}>Finalizar Cadastro</ButtonCenter>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mt-[40px] tracking-wide">
					Agradecemos por escolher o Branium. Estamos empolgados por ter você a bordo!
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mt-[16px] tracking-wide">
					Cumprimentos,
					<br />
					DevZero
				</Text>
			</MainLayout>
		</Html>
	);
}
