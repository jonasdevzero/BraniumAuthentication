import { Body, Container, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

interface Props {
	title: string;
	children?: React.ReactNode;
}

export default function MainLayout({ title, children }: Props) {
	return (
		<Tailwind>
			<Body className="bg-[#212020] mx-auto px-[56px] font-sans max-w-[600px]">
				<Text className="my-[24px] mb-[40px] text-[32px] font-normal leading-[40px] tracking-normal text-center text-white">
					{title}
				</Text>

				<Container className="mx-0 flex items-center">{children}</Container>
			</Body>
		</Tailwind>
	);
}
