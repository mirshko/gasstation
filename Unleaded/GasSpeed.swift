//
//  GasSpeed.swift
//  Unleaded
//
//  Created by Jeffrey Reiner on 8/17/20.
//

import SwiftUI

struct GasSpeed: View {
    var speed: String
    var time: String
    var cost: String
    
    var body: some View {
        HStack {
            Text(speed)
                .font(.title2)
            Spacer()
            Pill(text: time)
            Pill(text: cost)
        }
    }
}

struct GasSpeed_Previews: PreviewProvider {
    static var previews: some View {
        GasSpeed(speed: "Trader", time: "~30 secs", cost: "$0.93")
            .previewLayout(.sizeThatFits)
    }
}
