import { renderAsync } from '@react-email/render';
import { emails } from '@infra/mail/templates';

type ArgumentTypes<F extends Function> = F extends (props: infer A) => any
	? A
	: never;

export async function loadEmailTemplate<
	K extends keyof typeof emails,
	D = ArgumentTypes<(typeof emails)[K]>,
>(template: K, data: D) {
	const html = await renderAsync(emails[template](data as any));
	return html;
}
