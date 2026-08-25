# roGPE Business — relatório de validação de staging

Data: 2026-08-25.

## Resultado

O MVP institucional está ativo em `https://negocios.stage.rogpe.tech`.
Ele apresenta a proposta B2B sem inventar preço, escopo fechado, resultado
garantido ou dados de mercado. A página não coleta dados pessoais; os CTAs
abrem e-mail para `rodolfo@rogpe.tech`.

## Evidência técnica

- `GET /` respondeu `HTTP/2 200`;
- `GET /healthz` respondeu `ok`;
- os testes estáticos passaram: 3 testes, 0 falhas;
- a validação semântica estática passou;
- TLS e cabeçalhos CSP, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy` e `Permissions-Policy` foram verificados;
- o deploy vem da branch `develop`; `main` e `develop` exigem o check
  `verify` e não aceitam force-push ou exclusão.

## Limites aprovados para este corte

- `negocios.rogpe.tech` continua sem promoção: produção requer aprovação
  humana explícita depois da avaliação de staging;
- Canvas, dossiê de mercado, preço, SLA, captação de lead, CRM, analytics e
  qualquer processamento de PII continuam bloqueados até seus contratos,
  responsáveis, consentimento LGPD e métricas serem aprovados no OpenProject;
- não há alegação de case, ROI ou certificação que ainda não possua evidência.

## Próximo gate

Executar o diagnóstico-piloto com baseline, rubrica e decisão humana; então
aprovar o contrato de conversão e os eventos de métricas antes de adicionar
formulário ou analytics.
