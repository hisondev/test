package com.example.demo.biz.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.biz.member.domain.Member;
import com.example.demo.biz.member.repository.MemberRepository;
import com.example.demo.common.api.caching.CachingWebSocketSessionManager;
import com.example.demo.common.data.model.DataModel;
import com.example.demo.common.data.wrapper.DataWrapper;

import java.util.List;

@Service
public class MemberService {

    private final CachingWebSocketSessionManager cachingWebSocketSessionManager = CachingWebSocketSessionManager.getInstance();

    @Autowired
    private MemberRepository memberRepository;
    
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public DataWrapper getMember(@RequestBody DataWrapper dw) {
        System.out.println("########################## getMember ##########################");
        System.out.println("dw : " + dw.toString());

        DataWrapper rtdw = new DataWrapper();
        DataModel dm = new DataModel("regdate","deptcode","membername","test");
        dm.insert(dw.getDataModel("key1"));
        dm.setColumnSameValue("test", null);
        List<Member> mList = dm.getConvertedEntities(Member.class);
        System.out.println(mList.toString());
        rtdw.putDataModel("result", dm);
        
        System.out.println("########################## getMember ##########################");
        // return null;
        return rtdw;
    }

    public DataWrapper justTest(@RequestBody DataWrapper dw) {
        System.out.println("########################## justTest ##########################");
        cachingWebSocketSessionManager.notifyAllSessions("updated");
        System.out.println("########################## justTest ##########################");
        return null;
    }

    // @Transactional
    // public DataWrapper update(DataWrapper dataWrapper) {
    //     Long id = Long.valueOf(dataWrapper.getString("id"));
    //     String memberName = dataWrapper.getString("memberName");

    //     var member = memberRepository.findById(id)
    //         .map(e -> {
    //             e.setMembername(memberName);
    //             return e;
    //         }).orElse(null);
    //     DataModel dm = new DataModel(member);
    //     DataWrapper rtnDw = new DataWrapper();
    //     rtnDw.setDataModel("result", dm);
    //     return rtnDw;
    // }

    // public DataWrapper getMember(DataWrapper dataWrapper) {
    //     System.out.println("#################################################");
    //     System.out.println("test");
    //     System.out.println("dataWrapper : \n" + dataWrapper.toString());

    //     DataModel dm1 = new DataModel("id", "deptcode", "email", "regdate");
    //     dm1.insert(dataWrapper.getDataModel("key1"));
        
    //     System.out.println("dm1 : \n"+dm1);
        
    //     System.out.println("#################################################");

    //     var memberList = dm1.getConvertEntities(Member.class);
    //     System.out.println(memberList.toString());

    //     DataWrapper dw = new DataWrapper("result","completed");
    //     // System.out.println(dw.toString());
    //     return dw;
    // }
    
    // public Member createMember(MemberDTO memberDTO) {
    //     return memberRepository.save(MemberMapper.convertToEntity(memberDTO));
    // }

    // public List<Member> createMembers(List<MemberDTO> memberDTOs) {
    //     List<Member> members = memberDTOs.stream()
    //                                 .map(MemberMapper::convertToEntity)
    //                                 .collect(Collectors.toList());
    //     return memberRepository.saveAll(members);
    // }
}
