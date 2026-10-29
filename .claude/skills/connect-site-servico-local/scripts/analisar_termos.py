#!/usr/bin/env python3
"""Resumo do relatório de termos de pesquisa do Google Ads.

Uso: python3 -I analisar_termos.py Relatorio_de_termos_de_pesquisa.csv [mais_termos]
O CSV exportado pelo Google Ads vem em UTF-16 com tabulação; também aceita UTF-8.
"""
import csv, io, sys
from collections import defaultdict

def ler(caminho):
    bruto = open(caminho, 'rb').read()
    for cod in ('utf-16', 'utf-8-sig', 'utf-8'):
        try:
            texto = bruto.decode(cod)
            break
        except UnicodeDecodeError:
            continue
    linhas = list(csv.reader(io.StringIO(texto), delimiter='\t' if '\t' in texto[:2000] else ','))
    i = next(n for n, l in enumerate(linhas) if l and l[0].strip().lower().startswith('termo de pesquisa'))
    cab = linhas[i]
    return [dict(zip(cab, l)) for l in linhas[i + 1:] if len(l) == len(cab) and not l[0].lower().startswith('total')]

def num(s):
    s = (s or '').replace('%', '').strip()
    if s in ('', '--'):
        return 0.0
    return float(s.replace('.', '').replace(',', '.'))

dados = ler(sys.argv[1])
limite = int(sys.argv[2]) if len(sys.argv) > 2 else 80
for d in dados:
    for k in ('Cliques', 'Impr.', 'Custo', 'Conversões'):
        d[k] = num(d.get(k, '0'))
custo = sum(d['Custo'] for d in dados)
cliques = sum(d['Cliques'] for d in dados)
conv = sum(d['Conversões'] for d in dados)
print(f'{len(dados)} termos | custo R$ {custo:.2f} | {int(cliques)} cliques | CPC médio R$ {custo / max(cliques, 1):.2f} | {conv:.1f} conversões')
por_tipo = defaultdict(float)
for d in dados:
    por_tipo[d.get('Tipo de corresp.', '?')] += d['Custo']
for t, v in sorted(por_tipo.items(), key=lambda x: -x[1]):
    print(f'  {t}: R$ {v:.2f} ({v / max(custo, 1) * 100:.0f}%)')
print('\nTermos com clique, por custo:')
for d in sorted([d for d in dados if d['Cliques'] > 0], key=lambda d: -d['Custo'])[:limite]:
    print(f"R$ {d['Custo']:8.2f} | {int(d['Cliques']):3d} cl | {d['Conversões']:4.1f} cv | {d['Termo de pesquisa']}")
