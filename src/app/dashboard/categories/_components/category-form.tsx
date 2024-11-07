import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categorySchema } from "@/schema/category";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = z.input<typeof categorySchema>;

type CategoryFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  disabled?: boolean;
  isPending?: boolean;
};

export const CategoryForm: FC<CategoryFormProps> = ({
  id,
  defaultValues,
  onSubmit,
  disabled,
  isPending,
  setIsOpen,
}) => {
  const [emojiIcon, setEmojiIcon] = useState<string>("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name || "",
      icon: defaultValues?.icon || "😀",
    },
  });

  async function handleSubmit(values: z.infer<typeof categorySchema>) {
    try {
      onSubmit(values);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Failed to create category", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid w-full items-center gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Food, Trip"
                  {...field}
                  className="max-w-[270px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-x-2.5">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {field.value || emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute bottom-5 z-20">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        field.onChange(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <FormLabel>Select an emoji</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2 items-center ml-auto mr-0">
          <Button type="submit" disabled={disabled}>
            {!!id ? (
              isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )
            ) : isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
