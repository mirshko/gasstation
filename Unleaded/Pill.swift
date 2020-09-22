//
//  Pill.swift
//  Unleaded
//
//  Created by Jeffrey Reiner on 8/17/20.
//

import SwiftUI

struct Pill: View {
    var text: String
    var isSmall: Bool = false
    
    var body: some View {
        Text(text)
            .font(isSmall ? .callout : .body)
            .fontWeight(isSmall ? .medium : .semibold)
            .padding(.horizontal, isSmall ? 8.0 : 10.0)
            .padding(.vertical, isSmall ? 4.0 : 6.0)
            .background(Color(UIColor.systemGray6))
            .foregroundColor(.primary)
            .cornerRadius(9999)
    }
}

struct Pill_Previews: PreviewProvider {
    static var previews: some View {
        Pill(text: "Value")
            .previewLayout(.sizeThatFits)
        
        Pill(text: "Value Dark")
            .previewLayout(.sizeThatFits)
            .colorScheme(.dark)
        
        Pill(text: "Small Value", isSmall: true)
            .previewLayout(.sizeThatFits)
        
        Pill(text: "Small Value Dark", isSmall: true)
            .previewLayout(.sizeThatFits)
            .colorScheme(.dark)
    }
}
