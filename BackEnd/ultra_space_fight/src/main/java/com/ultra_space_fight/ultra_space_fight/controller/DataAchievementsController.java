
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
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.AchievementsCashDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.ScoreDTO;
import com.ultra_space_fight.ultra_space_fight.service.DataAchievementsService;


@RestController
@RequestMapping("/data/achievement")
@CrossOrigin(origins = "https://felipebstefens.github.io")
class DataAchievementsController {
    

    private final DataAchievementsService dataAchievementsService;


    public DataAchievementsController(DataAchievementsService dataAchievementsService) {
        

        this.dataAchievementsService = dataAchievementsService;
    }


    @GetMapping("/get/ranking/score")
    public ResponseEntity<List<RankingScoreDTO>> getRankingScore() {
        

        List<RankingScoreDTO> listRanking = dataAchievementsService.getRankingList();
        

        return ResponseEntity.status(HttpStatus.OK).body(listRanking); 
    }


    @GetMapping("/get/ranking/score/match")
    public ResponseEntity<List<RankingScoreMatchDTO>> getRankingScoreMatch() {
        

        List<RankingScoreMatchDTO> listRanking = dataAchievementsService.getRankingMatchList();
        

        return ResponseEntity.status(HttpStatus.OK).body(listRanking);
    }


    @GetMapping("/get/achievements/{id}")
    public ResponseEntity<AchievementsDTO> getAchievementValues(@PathVariable long id) {


        AchievementsDTO achievementsDTO = dataAchievementsService.getAchievements(id);
        

        return ResponseEntity.status(HttpStatus.OK).body(achievementsDTO);
    }


    @PutMapping("/update/achievements/cash/{id}") 
    public ResponseEntity<ScoreDTO> updateScoreCash(@PathVariable long id, @RequestBody AchievementsCashDTO achievementsCashDTO) {
        

        ScoreDTO scoreDTO = dataAchievementsService.updateAchievementsCash(id, achievementsCashDTO);
        

        return ResponseEntity.status(HttpStatus.OK).body(scoreDTO);
    }
}