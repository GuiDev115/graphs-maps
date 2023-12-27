# 1. Introdução

Este trabalho tem o objetivo de consolidar conceitos teóricos e aspectos práticos relacionados à solução
de problemas computacionais usando grafos. Esta atividade é individual e consiste no desenvolvimento
de um mini-projeto que envolva a modelagem e solução de um problema usando grafos e sobre uma
base de dados (grafo) extraído de aplicações reais. 

# Propósito

Foi feito para conseguir adequar na proposta feito pela disciplima, então foi usado um banco de dados com 
vértices alocados perto do Aeroporto de Hartsfield em Atlanta.

O Algoritmo tem como base o Djisktra para conseguir o menor caminho possível em determinados locais como 
Burguer king, esquinas e outros comércios.

Detém apenas 43 vértices para o teste e os caminhos.

# Uso

Apenas executar o maps_script.html em seu browser que irá funcionar o projeto. Não há necessidade de instalação de
alguma depedência. Pode iniciar diretamente no index.html. API já está colocada, contudo há a necessidade de criar uma nova caso essa no codigo expire.

### Exemplo do teste

Do ponto do aeroporto para United Club

![!\[Exemplo Teste\]](img/teste.png)

# Note

1. Para utilizar o script, o utilizador deve solicitar uma API - Key e substituí-la em:
```javascript
<script async defer src="https://maps.googleapis.com/maps/api/js?key=apikey&callback=initMap">
```

# Atenção

O script tem apenas 43 marcadores. Para adicionar mais, é necessário editar a variável **data** utilizando o 
editor GeoJson do Google e adicionar os vértices e as arestas adequados.

