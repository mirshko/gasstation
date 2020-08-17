//
//  GasGuzzler.swift
//  Unleaded
//
//  Created by Jeffrey Reiner on 8/17/20.
//

import SwiftUI

struct GasGuzzler: View {
    var address: String
    var percent: String
    
    var body: some View {
        HStack {
            Image("AddressIcon")
                .resizable()
                .frame(width: 32, height: 32)
                .background(Color.gray.opacity(0.2))
                .clipShape(/*@START_MENU_TOKEN@*/Circle()/*@END_MENU_TOKEN@*/)
            Text(address)
                .foregroundColor(.primary)
            Spacer()
            Pill(text: percent, isSmall: true)
        }
    }
}

struct GasGuzzler_Previews: PreviewProvider {
    static var previews: some View {
        GasGuzzler(address: "0x1234...5678", percent: "24.14%")
            .previewLayout(.sizeThatFits)
    }
}
