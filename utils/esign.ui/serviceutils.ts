import { request } from '@playwright/test';

export async function sendSoapRequest(url: string, xmlPayload: string, soapAction: string) {
  const context = await request.newContext();
  const response = await context.post(url, {
    data: xmlPayload,
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': soapAction,
    },
  });
  return response;
}