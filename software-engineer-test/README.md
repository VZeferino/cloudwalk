# Quake 3 Arena Log Parser

Este projeto é um analisador de logs do Quake 3 Arena. Ele processa os arquivos de log do servidor do jogo, organiza os dados das partidas e gera relatórios detalhados em formato JSON.

# (Error-Remember always to revise)
## Contato

Se tiver dúvidas ou sugestões, entre em contato pelo e-mail: [seu-email@example.com](mailto:seu-email@example.com).

## Estrutura do Projeto

A estrutura de diretórios do projeto é a seguinte:

```
software-engineer-test/
├── code/
│   └── log_parser.py  # Script principal para análise de logs
├── log/
│   └── qgames.log     # Arquivo de log do Quake 3 Arena
├── report/
│   └── game_report.json  # Relatório gerado após a execução
└── README.md          # Documentação do projeto
```

## Funcionalidades

O projeto implementa as seguintes funcionalidades:

- **Leitura do log:** Faz a leitura do arquivo de log do servidor do Quake 3 Arena.
- **Agrupamento de dados:** Organiza os dados de cada partida separadamente.
- **Análise de mortes:** Calcula as estatísticas de mortes, incluindo métodos e jogadores envolvidos.
- **Geração de relatório:** Cria um relatório em formato JSON com as informações de cada partida e notas adicionais.

## Como Usar

### Pré-requisitos

- Python 3

### Configuração do Ambiente

1. Clone este repositório:

   ```bash
   git clone <url-do-repositorio>
   cd software-engineer-test
   ```

2. Certifique-se de que o arquivo de log `qgames.log` esteja no diretório `log/`.

### Executando o Script

1. Navegue até o diretório `code/`:

   ```bash
   cd code
   ```

2. Execute o script `log_parser.py`:

   ```bash
   python3 log_parser.py
   ```

3. Após a execução, o relatório será salvo no diretório `report/` com o nome `game_report.json`.

### Exemplo de Relatório

```json
{
    "game_1": {
        "total_kills": 0,
        "players": [],
        "kills": {},
        "kills_by_means": {},
        "notes": "Ninguém entrou no jogo."
    },
    "game_2": {
        "total_kills": 11,
        "players": [
            "Isgalamido",
            "Mocinha"
        ],
        "kills": {
            "Isgalamido": -5
        },
        "kills_by_means": {
            "MOD_TRIGGER_HURT": 7,
            "MOD_ROCKET_SPLASH": 3,
            "MOD_FALLING": 1
        },
        "notes": "O vencedor foi Isgalamido."
    }
}
```

## Notas Adicionais

- **Jogadores Inativos:** Se nenhum jogador participar de uma partida, será adicionada a nota "Ninguém entrou no jogo.".
- **Vencedor:** O vencedor é o jogador com o maior número de kills.
