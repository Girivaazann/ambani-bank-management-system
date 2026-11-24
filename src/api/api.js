const BASE = (import.meta.env.VITE_BANK_API_URL || '').replace(/\/$/, '');
export async function bankApi(path,{token,method='GET',body,signal}={}) {
 const controller=new AbortController(); const timeout=setTimeout(()=>controller.abort(),15000);
 const combined=signal?AbortSignal.any([signal,controller.signal]):controller.signal;
 try {
  const headers={}; if(token)headers.Authorization=`Bearer ${token}`;
  if(body && !(body instanceof FormData))headers['Content-Type']='application/json';
  const response=await fetch(`${BASE}${path}`,{method,headers,body:body instanceof FormData?body:body?JSON.stringify(body):undefined,signal:combined,credentials:'omit'});
  if(!response.ok){const error=await response.json().catch(()=>({}));throw new Error(error.error?.message||error.message||`Request failed (${response.status})`)}
  if(response.status===204)return null;
  if(response.headers.get('content-type')?.includes('application/json'))return response.json();
  return response.blob();
 }catch(error){if(error.name==='AbortError')throw new Error('Request timed out after 15 seconds');throw error}finally{clearTimeout(timeout)}
}
export const money=minor=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format((Number(minor)||0)/100);
export const mask=value=>{const s=String(value||'');return s.length>4?'•'.repeat(Math.min(s.length-4,12))+s.slice(-4):'••••'};
