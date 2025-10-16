// Package;
package com.ultra_space_fight.ultra_space_fight.controller;

// Imports;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.AchievementsDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.ranking.RankingScoreDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.ranking.RankingScoreMatchDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.ScoreCashDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.ScoreDTO;
import com.ultra_space_fight.ultra_space_fight.service.DataAchievementsService;

// Controller classe for Data Achievements;
@RestController
@RequestMapping("/data/achievement")
@CrossOrigin(origins = "http://127.0.0.1:5500")
class DataAchievementsController {
    
    // Declaring the Service of Data Achievements;
    private final DataAchievementsService dataAchievementsService;

    // Constructor;
    public DataAchievementsController(DataAchievementsService dataAchievementsService) {
        
        // Instanciating the Data Achievements Service;
        this.dataAchievementsService = dataAchievementsService;
    }

    // Endpoint to get the Users Ranking by Score;  
    @GetMapping("/get/ranking/score")
    public ResponseEntity<List<RankingScoreDTO>> getRankingScore() {
        
        // Getting the ranking list;
        List<RankingScoreDTO> listRanking = dataAchievementsService.getRankingList();
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(listRanking); 
    }

    // Endpoint to get the Users Ranking by Score Match;
    @GetMapping("/get/ranking/score/match")
    public ResponseEntity<List<RankingScoreMatchDTO>> getRankingScoreMatch() {
        
        // Getting the ranking list;
        List<RankingScoreMatchDTO> listRanking = dataAchievementsService.getRankingMatchList();
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(listRanking);
    }

    // Endpoint to get the Data Achievements by Id;
    @GetMapping("/get/achievements/{id}")
    public ResponseEntity<AchievementsDTO> getAchievementValues(@PathVariable long id) {

        // Getting the Data Achievements values;
        AchievementsDTO achievementsDTO = dataAchievementsService.getAchievements(id);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(achievementsDTO);
    }

    // Endpoint to update the score and cash by Id;
    @PutMapping("/update/score/cash/{id}") 
    public ResponseEntity<ScoreDTO> updateScoreCash(@PathVariable long id, @RequestBody ScoreCashDTO scoreCashDTO) {
        
        // Updating the Score and Cash, and getting the new Score;
        ScoreDTO scoreDTO = dataAchievementsService.updateScoreCash(id, scoreCashDTO);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(scoreDTO);
    }
}