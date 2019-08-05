import { Drawing, Layer, State, PolylineBuilder, StyleBuilder, CircleBuilder, GeometryElement } from 'svgar';

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
        let controlArrows = new Layer("control arrows").AddTag("arrow");

        let wallFills = new Layer("wall fills").AddTag("fill");
        let wallOutlines = new Layer("wall outlines").AddTag("outline");
        let interior = new Layer("interior").AddTag("interior");
        let courtyard = new Layer("courtyard").AddTag("courtyard");

        let ic = this.InnerCorners;
        courtyard.AddGeometry(
            new PolylineBuilder([ic[0], ic[1]])
            .LineTo([ic[2], ic[3]])
            .LineTo([ic[4], ic[5]])
            .LineTo([ic[6], ic[7]])
            .LineTo([ic[0], ic[1]])
            .Build())

        let oc = this.OuterCorners;
        interior.AddGeometry(
            new PolylineBuilder([oc[0], oc[1]])
            .LineTo([oc[2], oc[3]])
            .LineTo([oc[4], oc[5]])
            .LineTo([oc[6], oc[7]])
            .LineTo([oc[0], oc[1]])
            .Build().AddTag("interior"))
        

        let arrowOffset = 0.025;
        let arrowSize = 0.02;
        let wallThickness = 0.02;

        // Draw outer and inner wall lines
        for(let i = 0; i < 8; i+=2) {
            let aXi = i;
            let aYi = i + 1;
            let bXi = i == 6 ? 0 : i + 2;
            let bYi = i == 6 ? 1 : i + 3;

            // Outer wall control
            let oXa = this.OuterCorners[aXi];
            let oYa = this.OuterCorners[aYi];
            let oXb = this.OuterCorners[bXi];
            let oYb = this.OuterCorners[bYi];
            
            outerLayer.AddGeometry(
                new PolylineBuilder([oXa, oYa]).LineTo([oXb, oYb]).Build().AddTags(["outer", "wall-line", titles[i / 2]])
            );

            // Inner wall control
            let iXa = this.InnerCorners[aXi];
            let iYa = this.InnerCorners[aYi];
            let iXb = this.InnerCorners[bXi];
            let iYb = this.InnerCorners[bYi];

            innerLayer.AddGeometry(
                new PolylineBuilder([iXa, iYa]).LineTo([iXb, iYb]).Build().AddTags(["inner", "wall-line", titles[i / 2]])
            );

            // Control arrows
            // ( Chuck ) I am about to violate DRY to an uncomfortable degree
            // ( Chuck ) Alternatively: TODO: Not this
            let oPt = [(oXa + oXb) / 2, (oYa + oYb) / 2];
            let iPt = [(iXa + iXb) / 2, (iYa + iYb) / 2];

            let wt = wallThickness;

            if (i == 0 || i == 4) {
                // Horizontal segment

                if (i == 0) {
                    // Top segment

                    let outerWall = new PolylineBuilder([oXa + wt, oYa + (wt * 0.5)])
                        .HorizontalTo(oXb - wt)
                        .VerticalTo(oYb - (wallThickness * 0.5))
                        .HorizontalTo(oXa + wt)
                        .LineTo([oXa + wt, oYa + (wt * 0.5)]).Build();

                    let innerWall = new PolylineBuilder([iXa + wt, iYa + (wt * 0.5)])
                        .HorizontalTo(iXb - wt)
                        .VerticalTo(iYb - (wallThickness * 0.5))
                        .HorizontalTo(iXa + wt)
                        .LineTo([iXa + wt, iYa + (wt * 0.5)]).Build();

                    wallFills.AddGeometries([outerWall, innerWall]);
                    wallOutlines.AddGeometries([outerWall, innerWall]);
                }
                else {
                    // Bottom segment

                    let outerWall = new PolylineBuilder([oXa - wt, oYa + (wt * 0.5)])
                        .HorizontalTo(oXb + wt)
                        .VerticalTo(oYb - (wallThickness * 0.5))
                        .HorizontalTo(oXa - wt)
                        .LineTo([oXa - wt, oYa + (wt * 0.5)]).Build();

                    let innerWall = new PolylineBuilder([iXa - wt, iYa + (wt * 0.5)])
                        .HorizontalTo(iXb + wt)
                        .VerticalTo(iYb - (wallThickness * 0.5))
                        .HorizontalTo(iXa - wt)
                        .LineTo([iXa - wt, iYa + (wt * 0.5)]).Build();

                    wallFills.AddGeometries([outerWall, innerWall]);
                    wallOutlines.AddGeometries([outerWall, innerWall]);
                }

                // Outer edge arrows
                let outerTopPoints = [
                    oPt[0] + arrowSize,
                    oPt[1],
                    oPt[0],
                    oPt[1] + arrowSize,
                    oPt[0] - arrowSize,
                    oPt[1],
                    oPt[0] + arrowSize,
                    oPt[1]
                ]

                let outerBottomPoints = [
                    oPt[0] + arrowSize,
                    oPt[1],
                    oPt[0],
                    oPt[1] - arrowSize,
                    oPt[0] - arrowSize,
                    oPt[1],
                    oPt[0] + arrowSize,
                    oPt[1]
                ]

                // Apply offset
                for(let j = 1; j < 8; j+=2) {
                    outerTopPoints[j] = outerTopPoints[j] + arrowOffset;
                    outerBottomPoints[j] = outerBottomPoints[j] - arrowOffset;
                }

                let oT = outerTopPoints;
                let oB = outerBottomPoints;

                // Build geometry
                controlArrows.AddGeometries([
                    new PolylineBuilder([oT[0], oT[1]]).LineTo([oT[2], oT[3]]).LineTo([oT[4], oT[5]]).LineTo([oT[6], oT[7]])
                    .Build().AddTags(["outer", "top", "arrow", titles[i / 2]]),
                    new PolylineBuilder([oB[0], oB[1]]).LineTo([oB[2], oB[3]]).LineTo([oB[4], oB[5]]).LineTo([oB[6], oB[7]])
                    .Build().AddTags(["outer", "bottom", "arrow", titles[i / 2]])
                ]);

                // Inner edge arrows
                let innerTopPoints = [
                    iPt[0] + arrowSize,
                    iPt[1],
                    iPt[0],
                    iPt[1] + arrowSize,
                    iPt[0] - arrowSize,
                    iPt[1],
                    iPt[0] + arrowSize,
                    iPt[1]
                ]

                let innerBottomPoints = [
                    iPt[0] + arrowSize,
                    iPt[1],
                    iPt[0],
                    iPt[1] - arrowSize,
                    iPt[0] - arrowSize,
                    iPt[1],
                    iPt[0] + arrowSize,
                    iPt[1]
                ]

                // Apply offset
                for(let j = 1; j < 8; j+=2) {
                    innerTopPoints[j] = innerTopPoints[j] + arrowOffset;
                    innerBottomPoints[j] = innerBottomPoints[j] - arrowOffset;
                }

                let iT = innerTopPoints;
                let iB = innerBottomPoints;

                // Build geometry
                controlArrows.AddGeometries([
                    new PolylineBuilder([iT[0], iT[1]]).LineTo([iT[2], iT[3]]).LineTo([iT[4], iT[5]]).LineTo([iT[6], iT[7]])
                    .Build().AddTags(["inner", "top", "arrow", titles[i / 2]]),
                    new PolylineBuilder([iB[0], iB[1]]).LineTo([iB[2], iB[3]]).LineTo([iB[4], iB[5]]).LineTo([iB[6], iB[7]])
                    .Build().AddTags(["inner", "bottom", "arrow", titles[i / 2]])
                ]);
            }
            else {
                // Vertical segment

                if (i == 2) {
                    // Left segment

                    let outerWall = new PolylineBuilder([oXa - (wt * 0.5), oYa + wt])
                        .HorizontalTo(oXa + (wt * 0.5))
                        .VerticalTo(oYb - wt)
                        .HorizontalTo(oXa - (wt * 0.5))
                        .LineTo([oXa - (wt * 0.5), oYa + wt]).Build();

                    let innerWall = new PolylineBuilder([iXa - (wt * 0.5), iYa + wt])
                        .HorizontalTo(iXa + (wt * 0.5))
                        .VerticalTo(iYb - wt)
                        .HorizontalTo(iXa - (wt * 0.5))
                        .LineTo([iXa - (wt * 0.5), iYa + wt]).Build();

                    wallFills.AddGeometries([outerWall, innerWall]);
                    wallOutlines.AddGeometries([outerWall, innerWall]);
                }
                else {
                    // Right segment

                    let outerWall = new PolylineBuilder([oXa + (wt * 0.5), oYa - wt])
                        .HorizontalTo(oXa - (wt * 0.5))
                        .VerticalTo(oYb + wt)
                        .HorizontalTo(oXa + (wt * 0.5))
                        .LineTo([oXa + (wt * 0.5), oYa - wt]).Build();

                    let innerWall = new PolylineBuilder([iXa + (wt * 0.5), iYa - wt])
                        .HorizontalTo(iXa - (wt * 0.5))
                        .VerticalTo(iYb + wt)
                        .HorizontalTo(iXa + (wt * 0.5))
                        .LineTo([iXa + (wt * 0.5), iYa - wt]).Build();

                    wallFills.AddGeometries([outerWall, innerWall]);
                    wallOutlines.AddGeometries([outerWall, innerWall]);
                }

                // Outer edge arrows
                let outerRightPoints = [
                    oPt[0],
                    oPt[1] + arrowSize,
                    oPt[0] + arrowSize,
                    oPt[1],
                    oPt[0],
                    oPt[1] - arrowSize,
                    oPt[0],
                    oPt[1] + arrowSize
                ]

                let outerLeftPoints = [
                    oPt[0],
                    oPt[1] + arrowSize,
                    oPt[0] - arrowSize,
                    oPt[1],
                    oPt[0],
                    oPt[1] - arrowSize,
                    oPt[0],
                    oPt[1] + arrowSize
                ]

                // Apply offset
                for(let j = 0; j < 8; j+=2) {
                    outerRightPoints[j] = outerRightPoints[j] + arrowOffset;
                    outerLeftPoints[j] = outerLeftPoints[j] - arrowOffset;
                }

                let oR = outerRightPoints;
                let oL = outerLeftPoints;

                // Build geometry
                controlArrows.AddGeometries([
                    new PolylineBuilder([oR[0], oR[1]]).LineTo([oR[2], oR[3]]).LineTo([oR[4], oR[5]]).LineTo([oR[6], oR[7]])
                    .Build().AddTags(["outer", "right", "arrow", titles[i / 2]]),
                    new PolylineBuilder([oL[0], oL[1]]).LineTo([oL[2], oL[3]]).LineTo([oL[4], oL[5]]).LineTo([oL[6], oL[7]])
                    .Build().AddTags(["outer", "left", "arrow", titles[i / 2]])
                ]);

                // Inner edge arrows
                let innerRightPoints = [
                    iPt[0],
                    iPt[1] + arrowSize,
                    iPt[0] + arrowSize,
                    iPt[1],
                    iPt[0],
                    iPt[1] - arrowSize,
                    iPt[0],
                    iPt[1] + arrowSize
                ]

                let innerLeftPoints = [
                    iPt[0],
                    iPt[1] + arrowSize,
                    iPt[0] - arrowSize,
                    iPt[1],
                    iPt[0],
                    iPt[1] - arrowSize,
                    iPt[0],
                    iPt[1] + arrowSize
                ]

                // Apply offset
                for(let j = 0; j < 8; j+=2) {
                    innerRightPoints[j] = innerRightPoints[j] + arrowOffset;
                    innerLeftPoints[j] = innerLeftPoints[j] - arrowOffset;
                }

                let iR = innerRightPoints;
                let iL = innerLeftPoints;

                // Build geometry
                controlArrows.AddGeometries([
                    new PolylineBuilder([iR[0], iR[1]]).LineTo([iR[2], iR[3]]).LineTo([iR[4], iR[5]]).LineTo([iR[6], iR[7]])
                    .Build().AddTags(["inner", "right", "arrow", titles[i / 2]]),
                    new PolylineBuilder([iL[0], iL[1]]).LineTo([iL[2], iL[3]]).LineTo([iL[4], iL[5]]).LineTo([iL[6], iL[7]])
                    .Build().AddTags(["inner", "left", "arrow", titles[i / 2]])
                ]);
            }
        }

        Plan
        .AddLayer(outerLayer)
        .AddLayer(innerLayer)
        .AddLayer(controlArrows)
        .AddLayer(wallFills)
        .AddLayer(wallOutlines)
        .AddLayer(courtyard)
        .AddLayer(interior);

        // Build states
        Plan
        .AddState(
            new State("edit")
            .AddStyle(
                new StyleBuilder("wall-control")
                .Fill("#000000")
                .Stroke("#dcdcdc")
                .StrokeWidth("2px").Build()
            ).Target("wall-control", "wall-line")
            .AddStyle(
                new StyleBuilder("arrow-control")
                .Fill("#ffffff")
                .Stroke("#000000")
                .StrokeWidth("2px").Build()
            ).Target("arrow-control", "arrow")
            .AddStyle(
                new StyleBuilder("wall-fills")
                .Fill("#ffffff")
                .FillOpacity(0.5)
                .StrokeWidth("0px").Build()
            ).Target("wall-fills", "fill")
            .AddStyle(
                new StyleBuilder("wall-outlines")
                .Fill("none")
                .Stroke("dcdcdc")
                .StrokeWidth("4px").Build()
            ).Target("wall-outlines", "outline")
            .BringToFront("fill")
            .BringToFront("wall-line")
            .Hide("courtyard")
            .Hide("interior")
        )
        .AddState(
            new State("view")
            .AddStyle(
                new StyleBuilder("wall-fills")
                .Fill("#ffffff")
                .StrokeWidth("0px").Build()
            ).Target("wall-fills", "fill")
            .AddStyle(
                new StyleBuilder("wall-outlines")
                .Fill("none")
                .Stroke("000000")
                .StrokeWidth("4px").Build()
            ).Target("wall-outlines", "outline")
            .AddStyle(
                new StyleBuilder("wall-control")
                .Stroke("#000000")
                .StrokeWidth("0px").Build()
            ).Target("wall-control", "wall-line").Hide("arrow")
            .AddStyle(
                new StyleBuilder("controls")
                .Fill("none")
                .StrokeWidth("0px").Build()
            ).Target("controls", "arrow")
            .AddStyle(
                new StyleBuilder("courtyard")
                .Fill("#ffffff")
                .StrokeWidth("0px").Build()
            ).Target("courtyard", "courtyard")
            .AddStyle(
                new StyleBuilder("interior")
                .Fill("#dcdcdc")
                .StrokeWidth("0px").Build()
            ).Target("interior", "interior")
            .BringToFront("outline")
            .BringToFront("fill")
            .SendToBack("interior")
            .SendToBack("courtyard")
            
        );

        return Plan;
    }
    
}