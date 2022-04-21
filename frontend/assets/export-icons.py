#!/usr/bin/env python3
import argparse
import pathlib
import shutil
import subprocess
import sys

EXPORT_CONFIG = {
    "logo": "logo.png",
    "ios": "icon.png",
    "android": "adaptive-icon.png",
    "background": "adaptive-background.png",
    "splash": "splash.png",
    "favicon": "favicon.png",
    "feature": "feature.png",
}


def get_executable(*commands, required=False):
    for cmd in commands:
        if path := shutil.which(cmd):
            break
    else:
        print(f"Unable to locate executable for {' or '.join(commands)}")
        if required:
            sys.exit(1)

    return path


inkscape = get_executable("inkscape", "org.inkscape.Inkscape", required=True)
sharp = get_executable("sharp")


def info(message):
    print(f"\033[1;32m{message}\033[0m")


def run(args, timeout=15):
    proc = subprocess.Popen(args, stdout=subprocess.PIPE, text=True)
    try:
        return proc.communicate(timeout=timeout)[0]
    except TimeoutError:
        proc.kill()
    return None


def get_area_dimensions(infile, area_ids):
    args = [
        inkscape,
        infile,
        f"--query-id={','.join(area_ids)}",
        "--query-x",
        "--query-y",
        "--query-width",
        "--query-height",
    ]
    (x, y, w, h) = range(4)
    output = run(args)
    lines = output.strip().split("\n")
    return zip(
        tuple(float(v) for v in lines[x].split(",")),
        tuple(float(v) for v in lines[y].split(",")),
        tuple(float(v) for v in lines[w].split(",")),
        tuple(float(v) for v in lines[h].split(",")),
    )


def export_icon(infile, outfile, dimensions):
    (x, y, width, height) = dimensions
    args = [
        inkscape,
        infile,
        f"--export-area={x}:{y}:{x+width}:{y+height}",
        f"--export-filename={outfile}",
    ]
    info(f"Exporting -> {outfile}")
    run(args)


def export_android_legacy_icon(background, foreground, outfile):
    args = [
        sharp,
        f"--input={background}",
        f"--output={outfile}",
        "composite",
        foreground,
    ]
    info(f"Exporting -> {outfile}")
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
        "-t",
        "--export-to",
        metavar="dir",
        default=".",
        help="output directory to export icons to",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_command_line()

    # Ensure background is exported when android is selected
    ids = set(args.target_ids or EXPORT_CONFIG.keys())
    if "android" in ids:
        ids.add("background")

    infile = args.infile
    outdir = pathlib.Path(args.export_to).absolute()
    dimensions = dict(zip(ids, get_area_dimensions(infile, ids)))

    for target in ids:
        outfile = outdir / EXPORT_CONFIG[target]
        export_icon(infile, outfile, dimensions[target])

    if "android" in ids and sharp:
        background = outdir / EXPORT_CONFIG["background"]
        foreground = outdir / EXPORT_CONFIG["android"]
        outfile = outdir / "legacy-icon.png"
        export_android_legacy_icon(background, foreground, outfile)
