# Boramarcar

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

### Como utilizar (link pro site, explicação de como usar)

Para o projeto BoraMarcar, foi desenvolvido um site para facilitar a utilização da ferramenta. Para acessar o site, basta clicar [https://boramarcar.app.br/](https://boramarcar.app.br/).
Seu uso é bastante intuitivo, basta seguir os passos abaixo:

1. Crie um evento
2. Compartilhe o link do evento com os participantes
3. Aguarde os participantes preencherem os horários disponíveis
4. Veja o melhor horário para todos os participantes

## Tecnologias

### Backend

A aplicação foi desenvolvida utilizando Node.js, Express.js e MongoDB. Foram desenvolvidos 3 microsserviços, sendo eles:

- Member Mss
- Event Mss
- Availability Mss

Além de um barramento de eventos.
Para facilitar o desenvolvimento, foi utilizado o conceito de TDD, além de arquitetura limpa e princípios SOLID.

#### Como rodar

Clone o repositório em sua máquina, entre na pasta "back" e rode os seguintes comandos:
  
```bash
npm install
```

Para rodar os testes, utilize o comando:

```bash
npm test
```

Para rodar cada microsserviço, utilize o comando:

```bash
npm dev:<nome do microsserviço>
```

### Frontend

Para o frontend do BoraMarcar, foi utilizado React.js com Typescript e TailwindCSS.
O frontend foi desenvolvido utilizando o conceito de componentização, para facilitar a manutenção e reutilização de código.

## Como rodar

Clone o repositório em sua máquina, entre na pasta "front" e rode os seguintes comandos:

```bash
npm install
```

Para rodar o frontend, utilize o comando:

```bash
npm run dev
```

Para buildar o frontend, utilize o comando:

```bash
npm run build
```

## Documentação

O projeto foi documentado utilizando o Postman e sua documentação pode ser encontrada aqui:
[https://docs.boramacar.app.br/](https://docs.boramacar.app.br/)


## Infraestrutura
A infraestrutura do BoraMarcar foi desenvolvida utilizando o AWS CloudFormation, que é uma ferramenta de infraestrutura como código que permite criar e gerenciar recursos da AWS de forma programática.
Para o backend foi utilizado um EC2 t2.micro com cada microsserviço rodando de forma independente com Caddy como reverse proxy e conectado ao MongoDB Atlas.
Para o frontend foi utilizado um S3 para armazenar os arquivos estáticos e um CloudFront para servir os arquivos estáticos com menor latência.
Além disso, foi utilizado o Route53 para gerenciar o domínio e o ACM para gerenciar os certificados SSL.
E por fim o Github Actions foi utilizado para CI/CD do projeto para acelerar o desenvolvimento.

## Contribuidores

- [Enzo Sakamoto - 21.00210-0](https://github.com/enzosakamoto) - Frontend e Backend
- [Flavio Murata - 21.01192-3](https://github.com/flaviomurata) - Frontend
- [Vinícius de Oliveira Berti - 21.01219-9](https://github.com/viniciusberti) - Backend
- [João Vitor Choueri Branco - 21.01075-7](https://github.com/JoaoVitorBranco) - Backend
- [Pedro Henrique de Sousa Matumoto - 21.00784-5](https://github.com/PedroMatumoto) - Backend
- [Vitor Guirão Soller - 21.01444-2](https://github.com/VgsStudio) - Infraestrutura
