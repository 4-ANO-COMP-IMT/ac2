# BoraMarcar

O BoraMarcar é uma aplicação desenvolvida para facilitar a marcação de encontros e reuniões, oferecendo um espaço intuitivo para encontrar o melhor horário para todos de maneira rápida, sem precisar fazer uma autenticação longa e demorada ou colocar todos os eventuais participantes da reunião em convites que podem não ser vistos em uma plataforma específica.

Cada usuário indica o período mais conveniente para si e então o sistema é capaz de mostrar qual é o horário com mais disponibilidade dos usuários dentre o espaço de tempo especificado pelo criador dele.

## Sumário

1. [BoraMarcar](#boramarcar)
2. [Sumário](#sumário)
3. [Introdução](#introdução)
   - [O que é](#o-que-é)
   - [Motivação](#motivação)
4. [Como utilizar](#como-utilizar-link-pro-site-explicação-de-como-usar)
5. [Features](#features)
6. [Folders](#folders)
7. [Deploys](#deploys)
8. [Backend Modules](#backend-modules)
   - [MSS](#mss)
   - [Barramento](#barramento)
   - [Testes](#testes)
9. [Frontend Modules](#frontend-modules)
10. [Infraestrutura](#infraestrutura)
11. [Como rodar](#como-rodar)
    - [Backend](#backend)
    - [Frontend](#frontend)
12. [Documentação](#documentação)
13. [Contribuidores](#contribuidores)

## Introdução

### O que é

O BoraMarcar é uma ferramenta inovadora de agendamento online, desenvolvida
para facilitar a coordenação de encontros e reuniões entre grupos de pessoas. O principal
destaque do BoraMarcar é a interface profissional, mas intuitiva, que permite aos usuários
definirem os seus horários disponíveis para encontros de forma rápida e precisa. A ideia
central é criar uma visualização prática dos períodos mais convenientes para cada
participante, descomplicando o processo de marcar compromissos, reuniões ou quaisquer
outros tipos de encontros sociais

### Motivação

Esse projeto foi desenvolvido como parte das disciplinas ECM252 - Linguagens de Programação II e ECM516 - Arquitetura de Sistemas Computacionais do 4° ano do curso de Engenharia de Computação do Instituto Mauá de Tecnologia.
O objetivo do projeto é abordar um projeto fullstack, utilizando as tecnologias aprendidas nas disciplinas.

## Como utilizar (link pro site, explicação de como usar)

Para o projeto BoraMarcar, foi desenvolvido um site para facilitar a utilização da ferramenta. Para acessar o site, basta clicar [https://boramarcar.app.br/](https://boramarcar.app.br/).
Seu uso é bastante intuitivo, basta seguir os passos abaixo:

1. Crie um evento
2. Compartilhe o link do evento com os participantes
3. Aguarde os participantes preencherem os horários disponíveis
4. Veja o melhor horário para todos os participantes

## Features

- **Criação de Eventos Personalizados**: Os usuários podem criar eventos fornecendo detalhes como o nome do evento, descrição, e o intervalo de datas disponíveis. Uma interface intuitiva permite que os organizadores escolham as datas e horários para o evento de forma dinâmica.

- **Compartilhamento de Links de Participação**: Após a criação de um evento, um link único é gerado e pode ser compartilhado com os convidados. Ao acessar o link, os participantes são redirecionados para uma página onde podem visualizar o calendário de disponibilidades e marcar os horários em que estão livres.

- **Marcação de Disponibilidade**: Cada participante pode indicar suas disponibilidades marcando intervalos de horas em um calendário visual. A interface é projetada para ser responsiva, permitindo que a marcação seja feita de maneira simples, seja em desktop, tablet, ou celular

- **Visualização das Disponibilidades**: À medida que os participantes inserem suas disponibilidades, o organizador pode visualizar em tempo real quais são os horários mais convenientes para todos. O sistema destaca os horários em que há maior sobreposição de disponibilidade entre os participantes.

- **Temas dark e light**
- **Preview em tempo real**
- **Modo tela cheia**
- **Multiplataforma**

## Folders

- **back**: Back-end folder | Node.js struct
- **front**: Front-end folder | React struct

**A aplicação foi desenvolvida em Typescript.**

## Deploys

Nossa aplicação possue um IAC que é responsável por deixar nossa aplicação em produção sincronizada com nosso repositório no Github, permitindo deploys rápidos.

## Backend Modules

O Backend da aplicação foi desenvolvido em Node.js e Express.js com o uso de arquitetura de microserviços limpa e princípios SOLID desenvolvida pela Dev Community Mauá, estruturando o código em camadas, cada uma com uma responsabilidade, de forma a modularizar para facilitar a reutilização e manutenção do código.

O banco de dados utilizado foi o Atlas MongoDB, banco de dados não relacional, por conta de sua escalabilidade e flexibilidade para grandes volumes de dados.

### MSS

Os microserviços da aplicação são:

- `Member` - responsável pela criação dos membros de um evento.
- `Event` - responsável pela criação do evento que irá ocorrer.
- `Availability` - responsável por guardar qual a disponibilidade de cada membro.

Sua documentação detalhada está [neste link](https://docs.boramarcar.app.br/).

### Barramento

A responsabilidade pela entrega dos eventos é o barramento da nossa aplicação `EventBus`, componente obrigátorio para entrega do trabalho.

### Testes

Também utilizamos testes unitários para melhorar a estrutura do código e ajudar a identificação de problemas, além de um repositório local mockado para tal. Utilizamos TDD.

Para rodar os testes, entre na pasta do back e utilize o comando:

```
npm test
```

## Frontend Modules

O Frontend da aplicação foi desenvolvido com React.js,Typescript e TailwindCSS.O frontend foi desenvolvido utilizando o conceito de componentização, para facilitar a manutenção e reutilização de código.

## Infraestrutura

A infraestrutura do BoraMarcar foi desenvolvida utilizando o AWS CloudFormation, que é uma ferramenta de infraestrutura como código que permite criar e gerenciar recursos da AWS de forma programática.
Para o backend foi utilizado um EC2 t2.micro com cada microsserviço rodando de forma independente com Caddy como reverse proxy e conectado ao MongoDB Atlas.
Para o frontend foi utilizado um S3 para armazenar os arquivos estáticos e um CloudFront para servir os arquivos estáticos com menor latência.
Além disso, foi utilizado o Route53 para gerenciar o domínio e o ACM para gerenciar os certificados SSL.
E por fim o Github Actions foi utilizado para CI/CD do projeto para acelerar o desenvolvimento.

### Backend
<p align="center">
  <img width="500" alt="back-end" src="https://github.com/user-attachments/assets/ea9e83b2-3ba8-4ca3-ac7d-43a761999751">
</p>

### Frontend
<p align="center">
  <img width="500" alt="front-end" src="https://github.com/user-attachments/assets/07ac1f48-350e-4f4d-8950-d723e339fae5">
</p>

## Como rodar

### Backend

Clone o repositório em sua máquina, entre na pasta "back" e rode os seguintes comandos:

```bash
npm install
```

Para rodar cada microsserviço, utilize o comando:

```bash
npm run dev:<nome do microsserviço>
```

### Frontend

Clone o repositório em sua máquina, entre na pasta "front" e rode os seguintes comandos:

```bash
npm install
```

Para buildar o frontend, utilize o comando:

```bash
npm run build
```

Para rodar o frontend, utilize o comando:

```bash
npm run dev
```

## Documentação

O projeto foi documentado utilizando o Postman e sua documentação pode ser encontrada aqui:
[https://docs.boramarcar.app.br/](https://docs.boramarcar.app.br/)

## Contribuidores

- [Enzo Sakamoto - 21.00210-0](https://github.com/enzosakamoto) - Frontend e Backend
- [Flavio Murata - 21.01192-3](https://github.com/flaviomurata) - Frontend
- [Vinícius de Oliveira Berti - 21.01219-9](https://github.com/viniciusberti) - Backend
- [João Vitor Choueri Branco - 21.01075-7](https://github.com/JoaoVitorBranco) - Backend
- [Pedro Henrique de Sousa Matumoto - 21.00784-5](https://github.com/PedroMatumoto) - Backend
- [Vitor Guirão Soller - 21.01444-2](https://github.com/VgsStudio) - Infraestrutura
