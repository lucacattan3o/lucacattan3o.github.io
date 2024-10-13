// generic range function
const range = (start, stop) => Array(stop - start + 1).fill().map((_, i) => start + i);

// frequency of A4
const A = 440;

// the octave range - here 0 - 8
const octaveRange = range(0, 8).map(val => [val, val - 4]);

// semitone offset
const semitoneOffsets = [
    ["C", -9],
    ["C#", -8],
    ["Db", -8],
    ["D", -7],
    ["D#", -6],
    ["Eb", -6],
    ["E", -5],
    ["F", -4],
    ["F#", -3],
    ["Gb", -3],
    ["G", -2],
    ["G#", -1],
    ["Ab", -1],
    ["A", 0],
    ["A#", 1],
    ["Bb", 1],
    ["B", 2],
];

// map notes to frequencies
const notes = octaveRange.reduce((ob, [range, multiplier]) => semitoneOffsets.reduce((ob, [note, semitones]) => ({
    ...ob,
    [note + range]: A * Math.pow(2, (semitones + (multiplier * 12)) / 12),
}), ob), {});