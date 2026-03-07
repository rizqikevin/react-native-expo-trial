import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface PostListProps {
  id: number;
  avatar: string;
  image: string;
  username: string;
  caption: string;
}

const PostList = ({ item }: { item: PostListProps }) => {
  const CAPTION_LINES = 2;
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasLongCaption, setHasLongCaption] = useState(false);
  const [isCaptionMeasured, setIsCaptionMeasured] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
    setHasLongCaption(false);
    setIsCaptionMeasured(false);
  }, [item.id, item.caption]);

  return (
    <View>
      <View className="flex-row items-center px-4 mb-3">
        <Image
          source={{ uri: item?.image }}
          className="w-10 h-10 rounded-full"
        />
        <Text className="ml-3 font-semibold">{item.username}</Text>
      </View>
      <Image
        source={{ uri: item.image }}
        className="w-full h-96"
        resizeMode="cover"
      />
      <View className="flex-row items-center justify-between w-screen px-2 mt-1 mb-1">
        <View className="flex-row items-center justify-between gap-2">
          <Ionicons name="heart-outline" size={24} color="black" />
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </View>
        <Ionicons name="bookmark-outline" size={24} color="black" />
      </View>
      <View className="relative w-full px-2">
        {!isCaptionMeasured && (
          <Text
            className="absolute opacity-0 font-RobotoRegular"
            onTextLayout={(event) => {
              setHasLongCaption(event.nativeEvent.lines.length > CAPTION_LINES);
              setIsCaptionMeasured(true);
            }}
          >
            <Text className="font-bold">{item.username} </Text>
            {item.caption}
          </Text>
        )}

        <Text
          className="font-RobotoRegular"
          numberOfLines={isExpanded ? undefined : CAPTION_LINES}
        >
          <Text className="font-bold">{item.username} </Text>
          {item.caption}
        </Text>

        {hasLongCaption && (
          <TouchableOpacity onPress={() => setIsExpanded((prev) => !prev)}>
            <Text className="mt-1 text-xs text-gray-500 font-RobotoRegular">
              {isExpanded ? "perkecil" : "lihat selengkapnya"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PostList;
