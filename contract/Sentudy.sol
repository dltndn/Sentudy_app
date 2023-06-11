// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// @custom:security-contact james98099@gmail.com

import "@openzeppelin/contracts/access/Ownable.sol";

contract Sentudy is Ownable {
    // event 작성

    // 학습내용 배열(단어, 뜻, 문장(UTF-8 배열), 학습완료여부 구조체
    // 최대 20단어로 제한을 둘까...
    struct Sequence {
        uint ipfsHash;
    }

    // 함수 수행 성공 이벤트
    event executedWriteFunc(bool result);

    // 생성자
    constructor() Ownable() {
    }

    // 각 지갑이 소유하고 있는 학습 내용 배열
    mapping(address => Sequence[]) studentToContents;

    // 공유 회차 배열 인덱스 목록
    mapping(address => uint[]) sharedContents;

    // 회차 추가 함수
    function addStudyData(uint _ipfsHash) public returns(uint){
        Sequence memory newSequence = Sequence(_ipfsHash);
        studentToContents[msg.sender].push(newSequence);
        emit executedWriteFunc(true);
        return studentToContents[msg.sender].length;
    }

    // 전체 회차 조회 함수
    function getStudyEntireData(address _client) public view returns(Sequence[] memory) {
        return studentToContents[_client];
    }

    // 특정 회차 조회 함수
    // _sequenceNum : studentToContents 배열 인덱스 + 1
    function getStudyData(address _client, uint _sequenceNum) public view returns(Sequence memory) {
        require(_sequenceNum <= studentToContents[msg.sender].length, "Sequence number is worng.");
        return studentToContents[_client][_sequenceNum - 1];
    }

    // 특정 회차 수정 함수 
    // _sequenceNum : studentToContents 배열 인덱스 + 1
    function updateStudyData(uint _sequenceNum, uint _newIpfsHash) public {
        require(_sequenceNum <= studentToContents[msg.sender].length, "Sequence number is worng.");
        Sequence memory newSequence = Sequence(_newIpfsHash);
        studentToContents[msg.sender][_sequenceNum - 1] = newSequence;
        emit executedWriteFunc(true);
    }

    // 특정 회차 공유 설정 함수
    
    // 특정 회차 공유 해제 함수

    // 다른 지갑 주소 회차 정보 가져오는 함수
    function cherryPickFromOthers(address _owner, uint _sequenceNum) public {
        require(_sequenceNum <= studentToContents[_owner].length);
        Sequence memory newSequence = studentToContents[_owner][_sequenceNum - 1];
        studentToContents[msg.sender].push(newSequence);
        // _owner에게 소량의 코인 전송
        emit executedWriteFunc(true);
    }

 }