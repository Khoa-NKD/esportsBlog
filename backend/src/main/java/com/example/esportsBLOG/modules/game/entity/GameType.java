package com.example.esportsBLOG.modules.game.entity;

public enum GameType {
    LEAGUE_OF_LEGENDS("Liên Minh Huyền Thoại", "LOL"),
    VALORANT("Valorant", "VAL"),
    CS2("Counter-Strike 2", "CS2"),
    ARENA_OF_VALOR("Liên Quân Mobile", "AOV");

    private final String displayName;
    private final String shortCode;

    GameType(String displayName, String shortCode) {
        this.displayName = displayName;
        this.shortCode = shortCode;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getShortCode() {
        return shortCode;
    }
}
