# Google Ads — campanha de serviço local

## Diagnóstico da conta antiga

Peça o **Relatório de termos de pesquisa** (CSV, últimos 7–90 dias). O CSV vem em UTF-16 com tabulação; rode `scripts/analisar_termos.py <arquivo.csv>` para ver: gasto total, CPC médio, gasto por tipo de correspondência e a lista de termos com clique ordenada por custo. Depois agrupe o desperdício por categoria (serviços que não faz, compra de peça, DIY "como fazer", concorrentes, outras cidades) e mostre em tabela com R$ e %.

Achados típicos (Dutra): 36% da verba em serviço que não faz; correspondência ampla + AI Max = 75% do gasto; conversão antiga contando errado (37% de "conversão" inclusive em termos ruins), o que ensinou o lance automático a comprar o público errado.

## Recomendações de estrutura

- Palavras-chave em **frase** e **exata**; AI Max desligado; ampla só com conversão confiável.
- Segmentação de local: **Presença** (pessoas no local), não "interesse".
- Grupos por serviço (Encanador geral/bairros, Vazamento, Desentupimento, Caixa d'água/válvula/torneira) quando possível.
- Conversões antigas → secundárias (depois remover); novas: "Clique WhatsApp" e "Clique Ligar", categoria Contato, contagem **Uma**.

## Negativas

Uma lista só, cada termo nas 3 correspondências (termo, "termo", [termo]), colada em Biblioteca compartilhada → Listas de palavras-chave negativas. Negativa não reconhece acento: inclua com e sem. Base testada (adapte ao que o cliente NÃO faz):
- Serviços que não faz: marido de aluguel, faz tudo, pequenos reparos, pressurizador, boiler, aquecedor, gás, chuveiro elétrico (resistência, lorenzetti, esquenta, queimado), lava-louça, triturador, box, banheira, calha, reforma, caça-vazamento (caça, geofone, detectar, localizar…), fossa/caminhão/hidrojateamento.
- Compra de peça: kit, peça, mecanismo, torre, obturador, original, completo, modelos (2550, dn40), marcas de peça, loja, comprar, shopee, leroy, mercado livre, desentupidor, diabo verde, soda, veda, durepox.
- DIY/informacional: como, caseiro, "o que pode ser", "por que", "é o mesmo", "de quem é", responsabilidade, inquilino.
- Concorrentes que aparecem nos termos. Emprego/curso/grátis.
- **Não negativar**: "preço", "valor", "quanto custa", "o que fazer" (cliente com problema na mão), nem a palavra do serviço principal (ex.: "vazamento" sozinho bloquearia "conserto de vazamento").

Gere o arquivo .txt com um script (dedup) e envie para o usuário colar.

## Anúncio RSA

15 títulos (≤ 30 caracteres) e 4 descrições (≤ 90). Confira os tamanhos com Python antes de mandar. Mande cada um num bloco de código separado para copiar e colar. Fixe "Serviço 24 Horas em Cidade" na posição 1 e "Chegamos em Até X Minutos" na 2. Sem telefone e sem "!" nos títulos (reprova). Nada de termos de serviço que não faz nem "orçamento grátis". Se o Ads pré-preencher com anúncios antigos, "Limpar todos os recursos pré-preenchidos" (o aviso azul continua aparecendo e não impede publicar).

## Sitelinks

6 sitelinks: texto ≤ 25, cada descrição ≤ 35, URL de página real do site (serviços principais + Áreas Atendidas). Não use páginas de serviço que o cliente não faz.

## Conversões {#conversoes}

No GTM: Vinculador de conversões (All Pages); acionadores "Clique - Apenas links" com Click URL contém `api.whatsapp.com` e começa com `tel:`; tags de conversão do Google Ads com ID/rótulo de cada ação. Se o site também tem gtag com o mesmo ID, não duplicar a Tag do Google dentro do GTM. Testar no modo Visualizar (pular a abertura).

## Relatório para o cliente

Tabela antes × depois: investimento/dia, CPC médio, cliques/dia, chamadas, CPA, até que horas a verba dura. Confira a conta (CPA = gasto ÷ conversões). Se a taxa de conversão passar de ~30%, desconfie de contagem dupla e peça ao cliente o número real de contatos e serviços fechados. Avise que a campanha está em aprendizado (~7 dias). Mande também um texto curto pronto para WhatsApp.
