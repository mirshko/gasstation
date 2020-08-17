//
//  ContentView.swift
//  Unleaded
//
//  Created by Jeffrey Reiner on 8/16/20.
//

import SwiftUI

struct ContentView: View {
    var gasSpeeds: some View {
        VStack(alignment: .leading, spacing: 0) {
            VStack(alignment: .leading, spacing: 0) {
                Text("Gas Speeds")
                    .font(.title3)
                    .bold()
                    .padding(.bottom, 8)
                
                Text("By Cost")
                    .font(.caption2)
                    .bold()
                    .textCase(/*@START_MENU_TOKEN@*/.uppercase/*@END_MENU_TOKEN@*/)
                    .foregroundColor(.gray)
            }.padding(.vertical, 24)

            VStack(alignment: .leading, spacing: 16) {
                GasSpeed(speed: "Fast", time: "~30 secs", cost: "$0.93")
                
                Divider().background(Color.gray)
                
                GasSpeed(speed: "Average", time: "~42 secs", cost: "$0.86")
                
                Divider().background(Color.gray)

                GasSpeed(speed: "Slow", time: "~18.8 mins", cost: "$0.83")
            }
        }
        .padding(.horizontal, 20)
        .padding(.bottom, 16)
    }
    
    var gasGuzzlers: some View {
        VStack(alignment: .leading, spacing: 0) {
            VStack(alignment: .leading, spacing: 0) {
                Text("Gas Guzzlers")
                    .font(.title3)
                    .bold()
                    .padding(.bottom, 8)
                
                Text("By Percent")
                    .font(.caption2)
                    .bold()
                    .textCase(/*@START_MENU_TOKEN@*/.uppercase/*@END_MENU_TOKEN@*/)
                    .foregroundColor(.gray)
            }.padding(.vertical, 24)
            
            VStack(alignment: .leading, spacing: 16) {
                ForEach(0 ..< 10) { item in
                    GasGuzzler(address: "0x1234...5678", percent: "24.23%")
                }
            }
        }
        .padding(.horizontal, 20)
        .padding(.bottom, 16)
    }
    
    
    var body: some View {
        ScrollView {
            gasSpeeds
            
            Divider().background(Color.gray)

            gasGuzzlers
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
