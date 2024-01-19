import { Font, Head, Html, Preview, Text } from '@react-email/components';
import * as React from 'react';
import { ButtonCenter } from './components';
import MainLayout from './layouts/main';

interface Props {
	link: string;
}

export default function RecoverPasswordEmail({ link = 'http://localhost:5001' }: Props) {
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
			<Preview>Recuperação de senha</Preview>

			<MainLayout title="Recuperação de senha">
				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mb-[16px]">
					Prezado anônimo,
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mb-[40px]">
					Esperamos que este email o encontre bem. Parece que você solicitou a redefinição
					de senha para sua conta no Branium. Para garantir a segurança de sua conta,
					estamos prontos para ajudá-lo(a) a criar uma nova senha.
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mb-[24px]">
					Aqui estão as instruções simples para redefinir sua senha:
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mb-[24px]">
					1. Clique no link abaixo para acessar a página de redefinição de senha:
				</Text>

				<ButtonCenter link={link}>Redefinir Senha</ButtonCenter>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mt-[24px] mb-[40px]">
					2. Siga as instruções na página para criar uma nova senha. Certifique-se de
					escolher uma senha forte e única.
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mb-[16px]">
					Agradecemos por sua cooperação e compreensão.
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mb-[16px]">
					Se você não solicitou a redefinição de senha ou acredita que recebeu este email
					por engano, por favor, ignore-o. A segurança de sua conta é nossa prioridade, e
					estamos aqui para ajudar a resolver qualquer dúvida ou preocupação.
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mb-[16px]">
					Lembramos que é importante manter suas credenciais de acesso em segredo. Nunca
					compartilhe sua senha com terceiros e escolha senhas robustas que combinem
					letras, números e caracteres especiais.
				</Text>

				<Text className="text-base font-normal leading-[24px] tracking-normal text-left text-white mt-[16px] tracking-wide">
					Atenciosamente,
					<br />
					DevZero
				</Text>
			</MainLayout>
		</Html>
	);
}
