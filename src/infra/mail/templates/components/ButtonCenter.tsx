import { Link, Text } from '@react-email/components';
import * as React from 'react';

interface Props {
	children?: React.ReactNode;
	link: string;
}

export function ButtonCenter({ children, link }: Props) {
	return (
		<Link href={link} className="w-full inline-flex justify-center">
			<Text
				className="border text-base font-medium leading-[24px] rounded py-4 px-6 cursor-pointer my-0"
				style={{ color: '#000', backgroundColor: '#fff' }}
			>
				{children}
			</Text>
		</Link>
	);
}
