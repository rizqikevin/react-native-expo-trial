import PostList from "@/components/PostList";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const userPosts = [
    {
      id: 1,
      username: "kevin_dev",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      caption:
        "Akhirnya selesai setup buat ngoding React hari ini! Siap bikin komponen baru. 💻✨",
    },
    {
      id: 2,
      username: "raudatullatifah_",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raudatul",
      image:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
      caption:
        "Nggak sabar nunggu bulan November nanti! Persiapan terus berjalan 💍✨ #countingdays",
    },
    {
      id: 3,
      username: "jepret_alam",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jepret",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      caption:
        "Hunting foto di akhir pekan. Selalu seru eksplor angle baru buat fotografi. 📸🌿",
    },
    {
      id: 4,
      username: "biker_santuy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Biker",
      image:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
      caption:
        "Selesai ganti oli, tarikan motor Beat jadi enteng lagi! Siap gas jalan-jalan sore. 🛵💨",
    },
    {
      id: 5,
      username: "trader_saham",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trader",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      caption:
        "Market lagi merah, waktunya serok bawah atau wait and see nih? 📉📊",
    },
    {
      id: 6,
      username: "kopi.senja",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kopi",
      image:
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
      caption: "Kopi dulu sebelum pusing mikirin bug di project Motion. ☕😵‍💫",
    },
    {
      id: 7,
      username: "tech_reviewer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
      image:
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
      caption:
        "Thinkpad T480s ini memang badak banget buat kerja rodi. Awetnya juara! 💻🔥",
    },
    {
      id: 8,
      username: "foodie_jkt",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
      caption:
        "Nyobain pizza baru di daerah Selatan. Cheesenya lumer abis! 🍕🤤 #PIZZAHOLIC APA AJA DNEGAN CINATASD SDFGSDGSD sdfsdfsdfsdfdsfsdfsdfsdfsdfsdfsdf dfsdfsdf dsfsdfsdf dfsf",
    },
    {
      id: 9,
      username: "gadget_daily",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gadget",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      caption:
        "Ngetes kamera HP Oppo buat foto-foto. Lumayan juga hasilnya buat daily driver. 📱📸",
    },
    {
      id: 10,
      username: "frontend_daily",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frontend",
      image:
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
      caption:
        "Push code dulu ke GitLab dan GitHub sebelum weekend. Semoga nggak ada error pas deploy! 🚀👨‍💻",
    },
  ];

  return (
    <SafeAreaView className="items-center justify-center flex-1">
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={userPosts}
        renderItem={({ item }) => <PostList item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default index;
