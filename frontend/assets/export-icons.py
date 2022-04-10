#!/usr/bin/env python3
import argparse
import pathlib
import shutil
import subprocess
import sys

PRIMARY_COLOR = "#6200ee"
EXPORT_CONFIG = {
    "ios": [("icon.png", 1.0)],
    "android": [
        ("legacy-icon.png", 1.0),
        ("adaptive-icon.png", 0.0),
    ],
    "splash": [("splash.png", 0.0)],
    "favicon": [("favicon.png", 0.0)],
    "feature": [("feature.png", 1.0)]
}


def get_executable(*commands):
    for cmd in commands:
        if path := shutil.which(cmd):
            return path


inkscape = get_executable("inkscape", "org.inkscape.Inkscape")

if not inkscape:
    print("Unable to locate a inkscape executable…")
    print("Are you sure inkscape is installed?")
    sys.exit(1)


def run(args, timeout=15):
    proc = subprocess.Popen(args, stdout=subprocess.PIPE, text=True)
    try:
        return proc.communicate(timeout=timeout)[0]
    except TimeoutError:
        proc.kill()
    return None


def get_area_dimens(infile, area_ids):
    args = [
        inkscape,
        infile,
        f"--query-id={','.join(area_ids)}",
        "--query-x",
        "--query-y",
        "--query-width",
        "--query-height",
    ]
    (x, y, width, height) = range(4)
    output = run(args)
    lines = output.strip().split("\n")
    return zip(
        tuple(int(v) for v in lines[x].split(",")),
        tuple(int(v) for v in lines[y].split(",")),
        tuple(int(v) for v in lines[width].split(",")),
        tuple(int(v) for v in lines[height].split(",")),
    )


def export_icon(infile, outfile, dimens, bg_color, bg_opacity=1.0):
    (x, y, width, height) = dimens
    args = [
        inkscape,
        infile,
        f"--export-area={x}:{y}:{x+width}:{y+height}",
        f"--export-background={bg_color}",
        f"--export-background-opacity={bg_opacity}",
        f"--export-filename={outfile}",
    ]
    print(f"\033[1;32mExporting -> {outfile}\033[0m")
    run(args)


def parse_command_line():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "infile",
        help="input SVG file to export icons from",
    )
    parser.add_argument(
        "-i",
        "--target-ids",
        nargs="+",
        metavar="id",
        choices=EXPORT_CONFIG.keys(),
        help="list of target ids to export",
    )
    parser.add_argument(
        "-c",
        "--primary-color",
        metavar="color",
        default=PRIMARY_COLOR,
        help="primary color used as background color when exporting icons",
    )
    parser.add_argument(
        "-t",
        "--export-to",
        metavar="dir",
        default=".",
        help="output directory to export icons to",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_command_line()

    infile = args.infile
    ids = args.target_ids or EXPORT_CONFIG.keys()
    bg_color = args.primary_color
    outdir = pathlib.Path(args.export_to).absolute()

    dimens = dict(zip(ids, get_area_dimens(infile, ids)))

    export_config = dict(filter(lambda i: i[0] in ids, EXPORT_CONFIG.items()))

    for target, config in export_config.items():
        for filename, opacity in config:
            outfile = outdir / filename
            export_icon(infile, outfile, dimens[target], bg_color, opacity)
