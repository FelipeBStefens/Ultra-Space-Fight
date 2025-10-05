package com.ultra_space_fight.ultra_space_fight.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.service.DataAchievementsService;
import com.ultra_space_fight.ultra_space_fight.transferObjects.AchievementsTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.RankingScoreMatchTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.RankingScoreTDO;

@RestController
@RequestMapping("/data/achievement")
@CrossOrigin(origins = "http://127.0.0.1:5500")
class DataAchievementsController {
    
    private final DataAchievementsService dataAchievementsService;

    public DataAchievementsController(DataAchievementsService dataAchievementsService) {
        this.dataAchievementsService = dataAchievementsService;
    }

    @GetMapping("/get/ranking/score")
    public ResponseEntity<List<RankingScoreTDO>> getRankingScore() {
        
        List<RankingScoreTDO> listRanking = 
            dataAchievementsService.getRankingList();
        
        return ResponseEntity.status(HttpStatus.OK).body(listRanking); 
    }

    @GetMapping("/get/ranking/score/match")
    public ResponseEntity<List<RankingScoreMatchTDO>> getRankingScoreMatch() {
        
        List<RankingScoreMatchTDO> listRanking = 
            dataAchievementsService.getRankingMatchList();
        
        return ResponseEntity.status(HttpStatus.OK).body(listRanking);
    }

    @GetMapping("/get/achievements/{id}")
    public ResponseEntity<AchievementsTDO> getAchievementValues(@PathVariable long id) {

        AchievementsTDO achievementsTDO = 
            dataAchievementsService.getAchievements(id);
        
        return ResponseEntity.status(HttpStatus.OK).body(achievementsTDO);
    }
}