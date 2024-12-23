"""
Este módulo contém funções para analisar logs do jogo Quake 3 Arena.
"""

import os
import json
import re
from collections import defaultdict


def parse_log(file_path: str) -> dict:
    """
    Parseia o arquivo de log do Quake 3 Arena e organiza os dados de cada partida.
    """
    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    games = {}
    current_game = None
    total_kills = 0
    player_kills = defaultdict(int)
    kill_means = defaultdict(int)
    players = set()

    for line in lines:
        if "InitGame" in line:
            if current_game:
                # Finaliza o jogo anterior
                games[current_game] = {
                    "total_kills": total_kills,
                    "players": sorted(players),
                    "kills": dict(player_kills),
                    "kills_by_means": dict(kill_means),
                }
            # Inicia um novo jogo
            current_game = f"game_{len(games) + 1}"
            total_kills = 0
            player_kills = defaultdict(int)
            kill_means = defaultdict(int)
            players = set()

        if "Kill:" in line:
            total_kills += 1
            match = re.match(r".*Kill: \d+ \d+ (\d+): (.+) killed (.+) by (.+)", line)
            if match:
                __, killer, victim, method = match.groups()
                if killer == "<world>":
                    # Morto pelo mundo
                    player_kills[victim] -= 1
                else:
                    # Adiciona pontos ao jogador que matou
                    player_kills[killer] += 1
                    players.add(killer)
                players.add(victim)
                kill_means[method] += 1

    # Finaliza o último jogo
    if current_game:
        games[current_game] = {
            "total_kills": total_kills,
            "players": sorted(players),
            "kills": dict(player_kills),
            "kills_by_means": dict(kill_means),
        }

    return games


def generate_report(games: dict, report_path: str) -> None:
    """
    Gera um relatório em formato JSON com os dados das partidas e salva no diretório report,
    adicionando notas com contexto adicional sobre os jogos.
    """
    for game_data in games.items():
        if not game_data["players"]:
            game_data["notes"] = "Ninguém entrou no jogo."
        else:
            # Determina o vencedor pelo maior número de kills
            winner = max(game_data["kills"], key=game_data["kills"].get, default=None)
            if winner:
                game_data["notes"] = f"O vencedor foi {winner}."
            else:
                game_data["notes"] = "Nenhum vencedor definido."

    # Salva o relatório no caminho especificado
    with open(report_path, "w", encoding="utf-8") as report_file:
        json.dump(games, report_file, indent=4, ensure_ascii=False)
    print(f"Relatório salvo em: {report_path}")


if __name__ == "__main__":
    # Caminho para o arquivo de log
    LOG_FILE = "../log/qgames.log"

    # Caminho para o arquivo de relatório
    REPORT_DIR = "../report"
    os.makedirs(REPORT_DIR, exist_ok=True)
    report_file_path = os.path.join(REPORT_DIR, "game_report.json")

    games_data = parse_log(LOG_FILE)
    generate_report(games_data, report_file_path)
