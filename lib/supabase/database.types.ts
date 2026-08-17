export type StudioRole = "owner" | "staff";
export type CustomerStatus = "new" | "reviewing" | "contacted" | "done";
export type CustomerSource = "funnel" | "manual";
export type PaymentStatus = "pending" | "verified";
export type ReviewDecision =
  | "ready_for_report"
  | "need_more_photos"
  | "not_suitable";

export type Database = {
  public: {
    Tables: {
      studio_members: {
        Row: {
          user_id: string;
          role: StudioRole;
          display_name: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          role: StudioRole;
          display_name: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          role?: StudioRole;
          display_name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      studio_messages: {
        Row: {
          id: string;
          user_id: string;
          author_name: string;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          author_name: string;
          body: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          author_name?: string;
          body?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      studio_emails: {
        Row: {
          id: string;
          lead_id: string;
          sent_by: string;
          to_email: string;
          subject: string;
          body: string;
          resend_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          sent_by: string;
          to_email: string;
          subject: string;
          body: string;
          resend_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          sent_by?: string;
          to_email?: string;
          subject?: string;
          body?: string;
          resend_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      studio_reports: {
        Row: {
          id: string;
          lead_id: string;
          created_by: string;
          author_name: string;
          noticed: string;
          morning_routine: string;
          night_routine: string;
          avoid_items: string;
          extra_notes: string | null;
          sent_at: string | null;
          resend_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          created_by: string;
          author_name: string;
          noticed: string;
          morning_routine: string;
          night_routine: string;
          avoid_items: string;
          extra_notes?: string | null;
          sent_at?: string | null;
          resend_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          created_by?: string;
          author_name?: string;
          noticed?: string;
          morning_routine?: string;
          night_routine?: string;
          avoid_items?: string;
          extra_notes?: string | null;
          sent_at?: string | null;
          resend_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          session_id: string;
          full_name: string | null;
          email: string | null;
          selected_plan: string | null;
          plan_name: string | null;
          plan_price: string | null;
          answers: Record<string, unknown>;
          image_urls: string[];
          photo_paths: string[];
          photos_expire_at: string | null;
          photos_deleted_at: string | null;
          status: CustomerStatus;
          notes: string | null;
          source: CustomerSource;
          payment_status: PaymentStatus;
          assigned_to: string | null;
          report_sender_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          full_name?: string | null;
          email?: string | null;
          selected_plan?: string | null;
          plan_name?: string | null;
          plan_price?: string | null;
          answers?: Record<string, unknown>;
          image_urls?: string[];
          photo_paths?: string[];
          photos_expire_at?: string | null;
          photos_deleted_at?: string | null;
          status?: CustomerStatus;
          notes?: string | null;
          source?: CustomerSource;
          payment_status?: PaymentStatus;
          assigned_to?: string | null;
          report_sender_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          full_name?: string | null;
          email?: string | null;
          selected_plan?: string | null;
          plan_name?: string | null;
          plan_price?: string | null;
          answers?: Record<string, unknown>;
          image_urls?: string[];
          photo_paths?: string[];
          photos_expire_at?: string | null;
          photos_deleted_at?: string | null;
          status?: CustomerStatus;
          notes?: string | null;
          source?: CustomerSource;
          payment_status?: PaymentStatus;
          assigned_to?: string | null;
          report_sender_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      studio_reviews: {
        Row: {
          id: string;
          lead_id: string;
          created_by: string;
          author_name: string;
          decision: ReviewDecision;
          findings: string;
          noticed: string | null;
          morning_routine: string | null;
          night_routine: string | null;
          avoid_items: string | null;
          extra_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          created_by: string;
          author_name: string;
          decision: ReviewDecision;
          findings: string;
          noticed?: string | null;
          morning_routine?: string | null;
          night_routine?: string | null;
          avoid_items?: string | null;
          extra_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          created_by?: string;
          author_name?: string;
          decision?: ReviewDecision;
          findings?: string;
          noticed?: string | null;
          morning_routine?: string | null;
          night_routine?: string | null;
          avoid_items?: string | null;
          extra_notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
