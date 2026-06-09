from app.core.music import scale_for_key, transpose_key


def test_transpose_key_preserves_mode():
    assert transpose_key("F# min", -2) == "E min"
    assert transpose_key("B maj", 1) == "C maj"


def test_scale_for_key():
    assert scale_for_key("E min") == "Natural Minor"
    assert scale_for_key("C maj") == "Major"
    assert scale_for_key("not a key") is None
