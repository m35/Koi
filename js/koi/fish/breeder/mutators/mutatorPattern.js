/**
 * A fish pattern mutator that mutates a fish body pattern in place
 * @param {Pattern} pattern The pattern
 * @constructor
 */
const MutatorPattern = function(pattern) {
    this.pattern = pattern;

    this.mutateBase = new MutatorLayerBase(pattern.base);
    this.mutateShapeBody = new MutatorLayerShapeBody(pattern.shapeBody);
    this.mutateShapeFin = new MutatorLayerShapeFin(pattern.shapeFin);
};

MutatorPattern.prototype = Object.create(Mutator.prototype);

/**
 * Mutate a layer
 * @param {Layer} layer The layer
 * @param {Random} random A randomizer
 */
MutatorPattern.prototype.mutateLayer = function(layer, random) {
    const colors = this.enumerateColors(layer);

    switch (layer.id) {
        case LayerSpots.prototype.ID:
            new MutatorLayerSpots(layer).mutate(colors, random);

            break;
        case LayerRidge.prototype.ID:
            new MutatorLayerRidge(layer).mutate(colors, random);

            break;
        case LayerStripes.prototype.ID:
            new MutatorLayerStripes(layer).mutate(colors, random);

            break;
    }
};

/**
 * Enumerate all palette indices in this pattern except for the one of a certain layer
 * @param {Layer} except The layer to exempt from the enumeration
 * @returns {Number[]} An array of palette indices
 */
MutatorPattern.prototype.enumerateColors = function(except) {
    const colors = [];

    for (const layer of this.pattern.layers) if (layer !== except)
        colors.push(layer.paletteIndex);

    if (this.pattern.base !== except)
        colors.push(this.pattern.base.paletteIndex);

    return colors;
};

/**
 * Mutate the pattern
 * @param {Random} random A randomizer
 */
MutatorPattern.prototype.mutate = function(random) {
    for (const layer of this.pattern.layers)
        this.mutateLayer(layer, random);

    this.mutateBase.mutate(this.enumerateColors(this.mutateBase.layer), random);
    this.mutateShapeBody.mutate(random);
    this.mutateShapeFin.mutate(random);
};