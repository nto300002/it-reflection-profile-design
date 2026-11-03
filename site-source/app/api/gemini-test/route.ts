import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../../chatgpt-auth';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic='force-dynamic';
function result(body:object,status=200){return NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}})}
export async function POST(req:NextRequest){
 const u=await getChatGPTUser();
 if(!u||!env.ADMIN_EMAIL||u.email.toLowerCase()!==env.ADMIN_EMAIL.toLowerCase()||req.headers.get('origin')!==new URL(req.url).origin)return result({error:'認証を確認してください'},403);
 if(!env.GEMINI_API_KEY)return result({error:'Gemini APIキーが設定されていません'},503);
 try{
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({contents:[{parts:[{text:'Reply with the word OK.'}]}],generationConfig:{maxOutputTokens:64}}),signal:AbortSignal.timeout(25000)});
  if(!r.ok){const status=r.status;return result({error:status===401||status===403?'APIキー、権限、課金設定を確認してください':status===429?'Geminiの利用制限または割当を確認してください':`Gemini APIがエラーを返しました (${status})`},502)}
  const data=await r.json() as {candidates?:Array<{content?:{parts?:Array<{text?:string}>}}>};
  if(!data.candidates?.some(c=>c.content?.parts?.some(p=>typeof p.text==='string'&&p.text.trim())))return result({error:'Geminiから有効なテキスト応答がありませんでした'},502);
  return result({ok:true,model:'gemini-3.5-flash-lite'});
 }catch{return result({error:'Geminiへの通信がタイムアウトしたか、接続できませんでした'},502)}
}
