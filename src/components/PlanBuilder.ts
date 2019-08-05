import { Drawing, Layer, State, PolylineBuilder, StyleBuilder, CircleBuilder } from 'svgar';

export default class PlanBuilder {

    public OuterCorners: number[];
    public InnerCorners: number[];

    public Drawing!: Drawing;

    constructor(outer: number[], inner: number[]) {
        this.OuterCorners = outer;
        this.InnerCorners = inner;
    }

    public Build() : Drawing {
        let Plan = new Drawing("plan");

        let titles = [
            "first",
            "second",
            "third",
            "fourth"
        ]

        // Build geometries
        let outerLayer = new Layer("outer wall");
        let innerLayer = new Layer("inner wall");

        // Draw outer and inner wall lines
        for(let i = 0; i < 8; i+=2) {
            let aXi = i;
            let aYi = i + 1;
            let bXi = i == 6 ? 0 : i + 2;
            let bYi = i == 6 ? 1 : i + 3;

            let oXa = this.OuterCorners[aXi];
            let oYa = this.OuterCorners[aYi];
            let oXb = this.OuterCorners[bXi];
            let oYb = this.OuterCorners[bYi];
            
            outerLayer.AddGeometry(
                new PolylineBuilder([oXa, oYa]).LineTo([oXb, oYb]).Build().AddTags(["outer", "wall-line", titles[i / 2]])
            );

            let iXa = this.InnerCorners[aXi];
            let iYa = this.InnerCorners[aYi];
            let iXb = this.InnerCorners[bXi];
            let iYb = this.InnerCorners[bYi];

            innerLayer.AddGeometry(
                new PolylineBuilder([iXa, iYa]).LineTo([iXb, iYb]).Build().AddTags(["inner", "wall-line", titles[i / 2]])
            );
        }

        Plan.AddLayer(outerLayer).AddLayer(innerLayer);

        // Build states
        Plan.AddState(
            new State("default")
            .AddStyle(
                new StyleBuilder("wall-control")
                .Fill("#000000")
                .Stroke("#000000")
                .StrokeWidth("2px").Build()
            ).Target("wall-control", "wall-line")
        );

        return Plan;
    }
    
}