[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[ANGULAR__BADGE]: https://img.shields.io/badge/Angular-red?style=for-the-badge&logo=angular
[PROJECT__BADGE]: https://img.shields.io/badge/📱Visit_this_project-000?style=for-the-badge&logo=project
[PROJECT__URL]: https://challenge-smartfit.web.app/

# Desafio Frontend - Smart Fit

Este repositório contém a solução para o desafio de [Front-end da Smart Fit](https://github.com/bioritmo/front-end-code-challenge-smartsite/tree/master) 

## Para acessar o projeto
[![project][PROJECT__BADGE]][PROJECT__URL]

## Stack

![angular][ANGULAR__BADGE]
![typescript][TYPESCRIPT__BADGE]

## 📖 Sobre o desafio

A Smart Fit, atuando no segmento de fitness, passou por várias mudanças durante a pandemia. Foi necessário desenvolver uma página para buscar unidades abertas ou fechadas para consulta e reserva. 
Neste desafio, foi implementado as seguintes funcionalidades de acordo com as regras de negócio definidas:

### Funcionalidades
[x] Carrega unidades através do arquivo JSON [locations.json](https://test-frontend-developer.s3.amazonaws.com/data/locations.json) utilizando o método `GET`.
[x] Busca por todas as unidades.
[x] Busca por unidades com filtros.
[x] Previsão do número de resultados encontrados.
[x] Listagem das unidades encontradas após a busca.

### Regras de negócio
- Filtra unidades abertas ou fechadas.
- Filtra unidades por período de funcionamento.
- Valida e exibe os ícones corretos de acordo com o status da unidade.

## 🎨 Layout

O layout da aplicação foi baseado nos materiais disponibilizados, incluindo designs para dispositivos móveis e desktop, cores, imagens e fontes. A fidelidade ao layout proposto foi mantida, e a aplicação é responsiva para dispositivos móveis, tablets e desktops.
```bash
  npm start
```

## Licença
Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para obter mais detalhes.
