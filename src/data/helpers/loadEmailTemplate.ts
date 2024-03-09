import { renderAsync } from '@react-email/render';
import { emails } from '@infra/mail/templates';
import { ENV } from '@main/config/env';

type ArgumentTypes<F extends Function> = F extends (props: infer A) => any ? A : never;

const isDevelopment = ENV.NODE_ENV === 'development';

export async function loadEmailTemplate<
	K extends keyof typeof emails,
	D = ArgumentTypes<(typeof emails)[K]>,
>(template: K, data: D) {
	if (isDevelopment) return JSON.stringify(data);

	const html = await renderAsync(emails[template](data as any));
	return html;
}
