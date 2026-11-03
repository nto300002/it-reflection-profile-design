import { getChatGPTUser, chatGPTSignInPath } from './chatgpt-auth';
import { env } from 'cloudflare:workers';
import Notebook from './notebook';
export const dynamic = 'force-dynamic';
type Post = {id:string;entryDate:string;body:string};
export default async function Home() {
 const user=await getChatGPTUser();
 const isAdmin=Boolean(user && env.ADMIN_EMAIL && user.email.toLowerCase()===env.ADMIN_EMAIL.toLowerCase());
 if(isAdmin) return <Notebook/>;
 let posts:Post[]=[]; if(env.DB){const r=await env.DB.prepare('SELECT id, entry_date AS entryDate, body FROM entries WHERE published = 1 ORDER BY entry_date DESC, id DESC LIMIT 50').all<Post>(); posts=r.results;}
 return <div className="public-page"><header className="public-header"><a className="public-brand" href="/">余白 <small>Y O H A K U</small></a><span>学びと仕事の振り返りノート</span></header><main className="public-main"><div className="eyebrow">NOTES ON LEARNING &amp; WORK</div><h1>日々の気づきを、<br/>少しずつ<span>。</span></h1><p className="lead">学び、考え、試したこと。<br/>日々の積み重ねを綴っています。</p><div className="public-divider"/><div className="eyebrow">JOURNAL <span>PUBLIC NOTES</span></div><h2>公開記事</h2>{posts.length? <div className="public-posts">{posts.map(p=><article key={p.id}><time>{p.entryDate.replaceAll('-',' / ')}</time><p>{p.body}</p></article>)}</div>:<div className="empty"><span>✎</span><h3>公開記事はまだありません</h3><p>新しい記事が公開されるまで、しばらくお待ちください。</p></div>}<footer>YOUR PACE, YOUR PROGRESS. <a href={chatGPTSignInPath('/')}>管理者ログイン ↗</a></footer></main></div>;
}
