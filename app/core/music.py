from __future__ import annotations

import re

_PITCHES = ("C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B")
_KEY_RE = re.compile(r"^([A-G]#?)\s+(maj|min)$")


def parse_key(key: str | None) -> tuple[str, str] | None:
    match = _KEY_RE.match(str(key or "").strip())
    if match is None:
        return None
    return match.group(1), match.group(2)


def scale_for_key(key: str | None) -> str | None:
    parsed = parse_key(key)
    if parsed is None:
        return None
    return "Major" if parsed[1] == "maj" else "Natural Minor"


def transpose_key(key: str | None, semitones: int) -> str | None:
    parsed = parse_key(key)
    if parsed is None:
        return None
    root, mode = parsed
    try:
        idx = _PITCHES.index(root)
    except ValueError:
        return None
    target = (idx + semitones) % len(_PITCHES)
    return f"{_PITCHES[target]} {mode}"
