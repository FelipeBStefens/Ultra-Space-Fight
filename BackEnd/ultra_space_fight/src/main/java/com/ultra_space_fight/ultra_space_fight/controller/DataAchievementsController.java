package com.ultra_space_fight.ultra_space_fight.controller;

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

@RestController
@RequestMapping("/data/achievement")
@CrossOrigin(origins = "http://127.0.0.1:5500")
class DataAchievementsController {
    
    private final DataAchievementsService dataAchievementsService;

    public DataAchievementsController(DataAchievementsService dataAchievementsService) {
        this.dataAchievementsService = dataAchievementsService;
    }

    @GetMapping("/get/ranking/score")
    public ResponseEntity<List<RankingScoreDTO>> getRankingScore() {
        
        List<RankingScoreDTO> listRanking = 
            dataAchievementsService.getRankingList();
        
        return ResponseEntity.status(HttpStatus.OK).body(listRanking); 
    }

    @GetMapping("/get/ranking/score/match")
    public ResponseEntity<List<RankingScoreMatchDTO>> getRankingScoreMatch() {
        
        List<RankingScoreMatchDTO> listRanking = 
            dataAchievementsService.getRankingMatchList();
        
        return ResponseEntity.status(HttpStatus.OK).body(listRanking);
    }

    @GetMapping("/get/achievements/{id}")
    public ResponseEntity<AchievementsDTO> getAchievementValues(@PathVariable long id) {

        AchievementsDTO achievementsTDO = 
            dataAchievementsService.getAchievements(id);
        
        return ResponseEntity.status(HttpStatus.OK).body(achievementsTDO);
    }

    @PutMapping("/update/score/cash/{id}") 
    public ResponseEntity<ScoreDTO> updateScoreCash(
        @PathVariable long id, @RequestBody ScoreCashDTO scoreCashTDO) {
        
        ScoreDTO scoreTDO = 
            dataAchievementsService.updateScoreCash(id, scoreCashTDO);
        
        return ResponseEntity.status(HttpStatus.OK).body(scoreTDO);
    }
}